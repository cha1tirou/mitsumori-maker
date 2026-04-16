import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json(
      { error: "フィードバック内容が入力されていません" },
      { status: 400 }
    );
  }
  if (body.message.length > 5000) {
    return NextResponse.json(
      { error: "5000字以内で入力してください" },
      { status: 400 }
    );
  }

  let userEmail: string | null = null;
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? null;
  }

  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  if (slackUrl) {
    try {
      await fetch(slackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `📝 βフィードバック受信\nFrom: ${userEmail ?? "匿名"}\nCategory: ${body.category ?? "general"}\n\n${body.message}`,
        }),
      });
    } catch {
      // Slack失敗しても成功扱い
    }
  }

  return NextResponse.json({ ok: true });
}
