import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const MAX_PAYLOAD_BYTES = 1 * 1024 * 1024; // 1MB
const MAX_MASTER_ITEMS = 500;

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { companyInfo: null, priceMaster: [], customerMaster: [] },
      { status: 200 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_info, price_master, customer_master")
    .eq("id", user.id)
    .maybeSingle();

  return NextResponse.json({
    companyInfo: profile?.company_info ?? null,
    priceMaster: profile?.price_master ?? [],
    customerMaster: profile?.customer_master ?? [],
  });
}

export async function PUT(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "準備中" }, { status: 503 });
  }

  const text = await request.text();
  if (text.length > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { error: "ペイロードが大きすぎます（1MB以下）" },
      { status: 413 }
    );
  }

  let body: {
    companyInfo?: unknown;
    priceMaster?: unknown;
    customerMaster?: unknown;
  } | null = null;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // 配列サイズ上限
  if (Array.isArray(body.priceMaster) && body.priceMaster.length > MAX_MASTER_ITEMS) {
    return NextResponse.json(
      { error: `単価マスタは${MAX_MASTER_ITEMS}件まで` },
      { status: 400 }
    );
  }
  if (Array.isArray(body.customerMaster) && body.customerMaster.length > MAX_MASTER_ITEMS) {
    return NextResponse.json(
      { error: `取引先マスタは${MAX_MASTER_ITEMS}件まで` },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const update: Record<string, unknown> = {};
  if (body.companyInfo !== undefined) update.company_info = body.companyInfo;
  if (body.priceMaster !== undefined) update.price_master = body.priceMaster;
  if (body.customerMaster !== undefined)
    update.customer_master = body.customerMaster;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
