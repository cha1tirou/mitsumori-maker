-- =====================================================================
-- 見積書メーカー 建設業向け Supabase スキーマ
-- =====================================================================
-- 使い方：
-- 1. Supabase ダッシュボードの SQL Editor にこのファイルの内容を貼り付ける
-- 2. 「Run」で実行
-- 3. Authentication > Providers で Email (magic link) を有効化
-- =====================================================================

-- =====================================================================
-- 1. profiles: ユーザー情報・プラン・Stripe連携・マスタ
-- =====================================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  plan text not null default 'free' check (plan in ('free', 'solo', 'team')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text check (
    subscription_status in (
      'active', 'trialing', 'past_due', 'canceled',
      'incomplete', 'incomplete_expired', 'unpaid'
    )
  ),
  current_period_end timestamptz,
  -- 自社情報・マスタ（ユーザーがブラウザ跨いでも同期される）
  company_info jsonb default '{}'::jsonb,
  price_master jsonb default '[]'::jsonb,
  customer_master jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_stripe_customer_id_idx
  on public.profiles(stripe_customer_id);

-- 既存テーブルへのカラム追加（冪等）
alter table public.profiles
  add column if not exists company_info jsonb default '{}'::jsonb;
alter table public.profiles
  add column if not exists price_master jsonb default '[]'::jsonb;
alter table public.profiles
  add column if not exists customer_master jsonb default '[]'::jsonb;
alter table public.profiles
  add column if not exists referral_code text unique;
alter table public.profiles
  add column if not exists referred_by uuid references auth.users(id);
alter table public.profiles
  add column if not exists drip_sent jsonb default '{}'::jsonb;

-- referral_code を自動生成する関数（6文字、大文字+数字）
create or replace function public.generate_referral_code()
returns text
language plpgsql
as $$
declare
  code text;
  attempt int := 0;
begin
  loop
    -- 6文字のランダム英数字（紛らわしい文字 0/O/1/I/L を除外）
    code := upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 6));
    code := translate(code, '01IL', 'HJKM');
    -- 重複チェック
    if not exists (select 1 from public.profiles where referral_code = code) then
      return code;
    end if;
    attempt := attempt + 1;
    if attempt > 10 then
      return code; -- 諦めて返す（実用上ほぼ発生しない）
    end if;
  end loop;
end;
$$;

-- =====================================================================
-- 2. construction_quotes: 見積書保存（ソフトデリート対応）
-- =====================================================================
create table if not exists public.construction_quotes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quote_number text,
  client_name text,
  subject text,
  total numeric not null default 0,
  data jsonb not null,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.construction_quotes
  add column if not exists deleted_at timestamptz;

create index if not exists construction_quotes_user_id_idx
  on public.construction_quotes(user_id);

create index if not exists construction_quotes_user_id_created_at_idx
  on public.construction_quotes(user_id, created_at desc);

-- =====================================================================
-- 2.5 newsletter_subscribers: リードマグネット登録者（メルマガ配信用）
-- =====================================================================
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text, -- "checklist_download" 等
  created_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers(email);

-- =====================================================================
-- 2.55 ai_takeoff_logs: AI積算（PDF/図面→明細自動抽出）の使用ログ
--       月次の利用制限に使用
-- =====================================================================
create table if not exists public.ai_takeoff_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  source_type text, -- 'pdf' | 'image'
  success boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists ai_takeoff_logs_user_id_created_at_idx
  on public.ai_takeoff_logs(user_id, created_at desc);

alter table public.ai_takeoff_logs enable row level security;
drop policy if exists "ai_takeoff_logs_select_own" on public.ai_takeoff_logs;
create policy "ai_takeoff_logs_select_own"
  on public.ai_takeoff_logs for select
  using (auth.uid() = user_id);

-- 今月のAI積算利用数ビュー
create or replace view public.current_month_ai_takeoff_counts as
select
  user_id,
  count(*)::int as count
from public.ai_takeoff_logs
where created_at >= date_trunc('month', now() at time zone 'Asia/Tokyo') at time zone 'Asia/Tokyo'
  and success = true
group by user_id;

grant select on public.current_month_ai_takeoff_counts to authenticated;

-- =====================================================================
-- 2.6 video_post_logs: YouTube動画自動投稿ログ
-- =====================================================================
create table if not exists public.video_post_logs (
  id uuid primary key default gen_random_uuid(),
  topic_id text not null,
  youtube_video_id text,
  youtube_url text,
  heygen_video_id text,
  title text,
  status text check (status in ('success', 'failed')),
  error_message text,
  posted_at timestamptz not null default now()
);

create index if not exists video_post_logs_posted_at_idx
  on public.video_post_logs(posted_at desc);
create index if not exists video_post_logs_topic_id_idx
  on public.video_post_logs(topic_id);

alter table public.video_post_logs enable row level security;
-- 読み取りは認証ユーザーの誰でも（運営確認用）、書き込みは service_role のみ
drop policy if exists "video_logs_select_authed" on public.video_post_logs;
create policy "video_logs_select_authed"
  on public.video_post_logs for select
  using (auth.role() = 'authenticated');

-- =====================================================================
-- 3. email_send_logs: メール送信レート制限用
-- =====================================================================
create table if not exists public.email_send_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recipient text not null,
  sent_at timestamptz not null default now()
);

create index if not exists email_send_logs_user_id_sent_at_idx
  on public.email_send_logs(user_id, sent_at desc);

-- =====================================================================
-- 4. Row Level Security (RLS)
-- =====================================================================
alter table public.profiles enable row level security;
alter table public.construction_quotes enable row level security;
alter table public.email_send_logs enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- newsletter_subscribers: 匿名挿入のみ許可（ダウンロードフォーム用）
drop policy if exists "subscribers_anon_insert" on public.newsletter_subscribers;
create policy "subscribers_anon_insert"
  on public.newsletter_subscribers for insert
  with check (true);
-- SELECTは service_role のみ（認証ユーザーに公開する必要なし）

-- profiles: 自分のレコードのみ参照可能。**UPDATEはトリガーで保護**（#1 課金穴対策）
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- UPDATE ポリシー：認証ユーザーは自分の行を更新できるが、
-- 課金関連の列は trigger で service_role 以外からの変更を拒否
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- 課金関連列の保護トリガー
create or replace function public.protect_billing_columns()
returns trigger
language plpgsql
security definer
as $$
declare
  is_service_role boolean := (auth.role() = 'service_role');
begin
  if not is_service_role then
    -- 認証ユーザーが課金関連カラムを変更しようとしたらリセット（静かに無視）
    new.plan = old.plan;
    new.stripe_customer_id = old.stripe_customer_id;
    new.stripe_subscription_id = old.stripe_subscription_id;
    new.subscription_status = old.subscription_status;
    new.current_period_end = old.current_period_end;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_billing_columns_trigger on public.profiles;
create trigger protect_billing_columns_trigger
  before update on public.profiles
  for each row execute function public.protect_billing_columns();

-- construction_quotes: 自分のレコードのみ全操作可能（論理削除は UPDATE で）
drop policy if exists "quotes_select_own" on public.construction_quotes;
create policy "quotes_select_own"
  on public.construction_quotes for select
  using (auth.uid() = user_id);

drop policy if exists "quotes_insert_own" on public.construction_quotes;
create policy "quotes_insert_own"
  on public.construction_quotes for insert
  with check (auth.uid() = user_id);

drop policy if exists "quotes_update_own" on public.construction_quotes;
create policy "quotes_update_own"
  on public.construction_quotes for update
  using (auth.uid() = user_id);

drop policy if exists "quotes_delete_own" on public.construction_quotes;
create policy "quotes_delete_own"
  on public.construction_quotes for delete
  using (auth.uid() = user_id);

-- email_send_logs: 自分のログのみ参照可能、insert は API経由のみ（service_role想定）
drop policy if exists "email_logs_select_own" on public.email_send_logs;
create policy "email_logs_select_own"
  on public.email_send_logs for select
  using (auth.uid() = user_id);

drop policy if exists "email_logs_insert_own" on public.email_send_logs;
create policy "email_logs_insert_own"
  on public.email_send_logs for insert
  with check (auth.uid() = user_id);

-- =====================================================================
-- 5. 新規ユーザー登録時に profiles を自動作成するトリガー
-- =====================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  ref_code text;
  inviter_id uuid;
  metadata_ref text;
begin
  ref_code := public.generate_referral_code();
  -- auth.users.raw_user_meta_data.referral_code に招待コードがあれば inviter を特定
  metadata_ref := new.raw_user_meta_data ->> 'referral_code';
  if metadata_ref is not null and length(metadata_ref) > 0 then
    select id into inviter_id from public.profiles where referral_code = upper(metadata_ref);
  end if;

  insert into public.profiles (id, email, plan, referral_code, referred_by)
  values (new.id, new.email, 'free', ref_code, inviter_id)
  on conflict (id) do update
    set referral_code = coalesce(profiles.referral_code, ref_code),
        referred_by = coalesce(profiles.referred_by, inviter_id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
-- 6. updated_at 自動更新トリガー
-- =====================================================================
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists quotes_touch_updated_at on public.construction_quotes;
create trigger quotes_touch_updated_at
  before update on public.construction_quotes
  for each row execute function public.touch_updated_at();

-- =====================================================================
-- 7. 今月作成した見積書数を取得するビュー（日本時間ベース・ソフトデリート除外）
-- =====================================================================
create or replace view public.current_month_quote_counts as
select
  user_id,
  count(*)::int as count
from public.construction_quotes
where created_at >= date_trunc('month', now() at time zone 'Asia/Tokyo') at time zone 'Asia/Tokyo'
  and deleted_at is null
group by user_id;

grant select on public.current_month_quote_counts to authenticated;

-- =====================================================================
-- 8. 直近1時間のメール送信数ビュー（レート制限用）
-- =====================================================================
create or replace view public.recent_email_send_counts as
select
  user_id,
  count(*)::int as count
from public.email_send_logs
where sent_at >= now() - interval '1 hour'
group by user_id;

grant select on public.recent_email_send_counts to authenticated;
