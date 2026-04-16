import Anthropic from "@anthropic-ai/sdk";
import { VideoTopic } from "./topics";
import { getAnthropicKey } from "./env";

export interface GeneratedScript {
  title: string;
  description: string; // YouTube概要欄
  narration: string; // アバターが話す本文（3〜5分、800〜1200字）
  chapters: { time: string; label: string }[];
  tags: string[];
  thumbnailHeadline: string; // サムネ用の短いフレーズ
}

const SYSTEM_PROMPT = `あなたは建設業向けの見積書作成SaaS「ケンミツ」の編集者です。
YouTubeの法令解説動画の原稿を作成します。

守るべきルール:
- 対象視聴者：建設業の一人親方・小規模工務店の経営者（40-60代、IT慣れていない層多め）
- 改正建設業法（2025年12月全面施行済）およびフリーランス新法（2024年11月施行済）は正確に扱う
- 推測や不確かな法解釈は書かず、「詳しくは所属団体や専門家にご確認ください」で逃げる
- 広告っぽさを避ける（サービス宣伝は動画末尾に1行だけ）
- 専門用語は必ず平易な言葉に言い換える
- 数字と具体例を必ず入れる（例：「労務費の20%」）
- 語り口：落ち着いた説明調。「〜です」「〜ます」の丁寧語

動画の構成（厳守）:
1. 導入（15秒）— 「こんな経験ありませんか？」で視聴者の痛みを提示
2. 結論（30秒）— 今日の答えを3つに絞って先出し
3. 本編（2〜3分）— 結論の3点それぞれを具体例付きで解説
4. まとめ（30秒）— 再度3点を列挙し、実務での次の一歩
5. CTA（15秒）— 「詳しくは mitsumori-maker.com/construction をご覧ください」

必ず JSON 形式で返してください。Markdown装飾や余計な説明は一切つけないこと。`;

const USER_PROMPT_TEMPLATE = (topic: VideoTopic) => `以下のトピックで動画原稿を作成してください。

【トピック】
タイトル案：${topic.title}
切り口：${topic.angle}
ターゲット検索KW：${topic.targetKeyword}
関連KW：${topic.keywords.join(", ")}

【返却フォーマット（JSON のみ）】
{
  "title": "YouTubeタイトル（32字以内、検索KWを冒頭近くに配置、【】や数字・カッコで視認性UP）",
  "description": "YouTube概要欄（400〜600字）。導入1行、見出し「▼本日の内容」にチャプターリスト、関連リンク、ハッシュタグ5つ",
  "narration": "アバターが話す本文のみ（800〜1200字）。【導入】【結論】【本編1】【本編2】【本編3】【まとめ】【CTA】の見出しを入れる。",
  "chapters": [
    { "time": "0:00", "label": "はじめに" },
    { "time": "0:15", "label": "結論" },
    { "time": "0:45", "label": "ポイント1: ..." },
    { "time": "1:30", "label": "ポイント2: ..." },
    { "time": "2:15", "label": "ポイント3: ..." },
    { "time": "3:00", "label": "まとめ" }
  ],
  "tags": ["5〜8個の YouTube タグ"],
  "thumbnailHeadline": "サムネ用の短いフレーズ（10〜15字、強いワード）"
}`;

export async function generateScript(topic: VideoTopic): Promise<GeneratedScript> {
  const client = new Anthropic({ apiKey: getAnthropicKey() });

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: USER_PROMPT_TEMPLATE(topic) }],
  });

  const textContent = response.content.find((c) => c.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("Claude から空のレスポンス");
  }

  // JSON 部分を抽出（余計な説明が混ざることへの保険）
  const match = textContent.text.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("JSON を抽出できませんでした");
  }

  try {
    const parsed = JSON.parse(match[0]) as GeneratedScript;
    return parsed;
  } catch (err) {
    throw new Error(
      `JSON パース失敗: ${err instanceof Error ? err.message : "unknown"}`
    );
  }
}
