import Link from "next/link";
import SectionHeading from "./SectionHeading";

export default function OurStory() {
  return (
    <section id="story" className="bg-white py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto max-w-[920px] px-5 md:px-6">
        <div className="mb-12">
          <SectionHeading eyebrow="Our Story" title="なぜ、このツールを作ったのか" />
        </div>

        <div className="flex flex-col gap-5 text-[15px] leading-[2] text-kenmitsu-ink2 md:text-[17px]">
          <p className="m-0">
            改正建設業法2025が
            <strong className="text-kenmitsu-ink">2025年12月に全面施行</strong>
            され、一人親方・小規模工務店の現場では見積書の書き方を見直す必要が出ました。
          </p>
          <p className="m-0">
            しかし既存のソフトウェアは大きく2択しかない状態でした。
          </p>
        </div>

        <div className="my-9 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-[1.5px] border-kenmitsu-line bg-white p-6 opacity-75 md:p-7">
            <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-kenmitsu-muted md:text-[11px]">
              選択肢 A
            </div>
            <div className="mb-2.5 text-[16px] font-black md:text-[18px]">
              大手SaaS{" "}
              <span className="font-mono text-[14px] font-bold text-kenmitsu-muted md:text-[15px]">
                ¥9,800〜/月
              </span>
            </div>
            <p className="m-0 text-[13px] leading-[1.85] text-kenmitsu-muted md:text-[14px]">
              施工管理がメインで見積機能は「おまけ」扱い。導入研修が必要で定着まで数週間。Windows専用のツールも多い。
            </p>
          </div>
          <div className="rounded-2xl border-[1.5px] border-kenmitsu-line bg-white p-6 opacity-75 md:p-7">
            <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-kenmitsu-muted md:text-[11px]">
              選択肢 B
            </div>
            <div className="mb-2.5 text-[16px] font-black md:text-[18px]">
              無料のExcelテンプレート
            </div>
            <p className="m-0 text-[13px] leading-[1.85] text-kenmitsu-muted md:text-[14px]">
              法改正に未対応。ファイルが分散し、入力ミスや属人化の温床になる。スマホで編集できない。
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border-[1.5px] border-kenmitsu-navy100 bg-gradient-to-br from-kenmitsu-navy50 to-white p-7 md:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-[180px] w-[180px] rounded-full bg-kenmitsu-navy opacity-[0.08]"
          />
          <div className="relative">
            <div className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-kenmitsu-navy md:text-[11px]">
              私たちの答え
            </div>
            <p className="m-0 text-[17px] font-black leading-[1.7] tracking-[-0.005em] md:text-[20px]">
              「見積書作成」<span className="text-kenmitsu-navy">だけ</span>
              に特化して、
              <br className="hidden md:block" />
              <span className="bg-kenmitsu-orange50 px-1.5 shadow-[inset_0_-10px_0_0_theme(colors.kenmitsu.orange)]">
                月¥980
              </span>
              で、 改正建設業法2025に完全準拠した、
              <br />
              <strong>登録不要で試せる</strong>ツール ——
            </p>
            <p className="mt-4 text-[14px] leading-[1.85] text-kenmitsu-ink2 md:text-[15px]">
              この穴を埋めるために開発しました。広告収入にも頼らず、全ユーザーのサブスク収入だけで運営。機能追加は全員のフィードバックで優先順位を決めます。建設業界全体の適法化の一助となれば、という想いで作っています。
            </p>
          </div>
        </div>

        <div className="mt-7 flex items-center gap-3.5 border-t border-kenmitsu-line pt-6">
          <div
            aria-hidden
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-kenmitsu-navy text-[17px] font-black text-white"
          >
            建
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-black md:text-[15px]">
              ケンミツ 開発チーム
            </div>
            <div className="text-[12px] text-kenmitsu-muted md:text-[13px]">
              ご質問・ご要望は{" "}
              <Link
                href="/construction/contact"
                className="font-bold text-kenmitsu-navy hover:underline"
              >
                お問い合わせフォーム
              </Link>{" "}
              よりお気軽に。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
