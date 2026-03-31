import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const params = new URLSearchParams(body);
  const payloadStr = params.get("payload");
  if (!payloadStr) return NextResponse.json({ error: "no payload" }, { status: 400 });

  const payload = JSON.parse(payloadStr);
  const action = payload.actions?.[0];
  if (!action) return NextResponse.json({ error: "no action" }, { status: 400 });

  const value = action.selected_option?.value || action.value;
  const userName = payload.user?.name || "unknown";

  const token = process.env.GITHUB_TOKEN;
  const repo = "cha1tirou/mitsumori-maker";
  const filePath = ".pm/approval.json";
  const apiBase = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  const approval = {
    status: "approved",
    value,
    approvedBy: userName,
    approvedAt: new Date().toISOString(),
  };

  let sha: string | undefined;
  try {
    const existing = await fetch(apiBase, {
      headers: { Authorization: `token ${token}`, "User-Agent": "mitsumori-pm" },
    });
    if (existing.ok) {
      const data = await existing.json();
      sha = data.sha;
    }
  } catch {}

  const content = Buffer.from(JSON.stringify(approval, null, 2)).toString("base64");
  const bodyData: Record<string, unknown> = { message: `PM approval: ${value}`, content };
  if (sha) bodyData.sha = sha;

  await fetch(apiBase, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "mitsumori-pm",
    },
    body: JSON.stringify(bodyData),
  });

  return NextResponse.json({
    response_type: "in_channel",
    replace_original: true,
    text: `✅ *${userName}* が承認しました: \`${value}\`\n⚙️ Claude Codeが作業を開始します...`,
  });
}
