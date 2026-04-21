import { ConstructionQuoteData } from "@/types/construction";

export type Plan = "free" | "solo" | "team";
export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid"
  | null;

export interface Profile {
  id: string; // uuid, Supabase Auth の user.id と同一
  email: string;
  plan: Plan;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: SubscriptionStatus;
  current_period_end: string | null; // ISO8601
  company_info: Record<string, unknown> | null;
  customer_master: unknown[] | null;
  price_master: unknown[] | null;
  created_at: string;
  updated_at: string;
}

export interface ConstructionQuoteRow {
  id: string;
  user_id: string;
  quote_number: string | null;
  client_name: string | null;
  subject: string | null;
  total: number;
  data: ConstructionQuoteData;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at"> &
          Partial<Pick<Profile, "created_at" | "updated_at">>;
        Update: Partial<Profile>;
      };
      construction_quotes: {
        Row: ConstructionQuoteRow;
        Insert: Omit<ConstructionQuoteRow, "id" | "created_at" | "updated_at"> &
          Partial<Pick<ConstructionQuoteRow, "id" | "created_at" | "updated_at">>;
        Update: Partial<ConstructionQuoteRow>;
      };
    };
  };
}
