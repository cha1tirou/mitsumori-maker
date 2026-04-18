const ILU = {
  ink: "#0B1220",
  line: "#1F2A44",
  brand: "#1E40AF",
  brandLight: "#9CB5F0",
  brand50: "#EEF3FF",
  helmet: "#F59E0B",
  helmetDark: "#C27803",
  skin: "#FFD9B3",
  skinShadow: "#F2B97F",
  uniform: "#2F58C9",
  uniformDark: "#1E40AF",
  paper: "#FBFCFE",
  ok: "#0E7A52",
  warn: "#B45309",
  amber: "#FEF3C7",
  muted: "#55617A",
};

export type IluKind =
  | "rejected"
  | "confused"
  | "excel"
  | "offsite"
  | "calc"
  | "expensive"
  | "lawCheck"
  | "presets"
  | "autocalc"
  | "phone"
  | "rocket"
  | "cloud";

function WorkerHeadInline() {
  return (
    <g>
      <rect x="-8" y="18" width="16" height="14" fill={ILU.skinShadow} />
      <circle cx="0" cy="0" r="22" fill={ILU.skin} />
      <path
        d="M-22 -4 Q0 8 22 -4 L22 -18 L-22 -18 Z"
        fill={ILU.skinShadow}
        opacity="0.35"
      />
      <path
        d="M-27 -8 Q-27 -28 0 -28 Q27 -28 27 -8 L27 -5 L-27 -5 Z"
        fill={ILU.helmet}
      />
      <rect x="-30" y="-7" width="60" height="4" rx="2" fill={ILU.helmetDark} />
      <path
        d="M-4 -28 L4 -28 L4 -8 L-4 -8 Z"
        fill={ILU.helmetDark}
        opacity="0.5"
      />
      <path
        d="M-6 2 L-2 2"
        stroke={ILU.ink}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M2 2 L6 2"
        stroke={ILU.ink}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M-5 12 Q0 8 5 12"
        stroke={ILU.ink}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

export function IluCard({ kind }: { kind: IluKind }) {
  const W = 200;
  const H = 140;

  const scenes: Record<IluKind, React.ReactNode> = {
    rejected: (
      <g>
        <rect
          x="52"
          y="22"
          width="96"
          height="110"
          rx="4"
          fill="#fff"
          stroke={ILU.line}
          strokeWidth="1.5"
        />
        {[40, 52, 62, 74, 84].map((y, i) => (
          <line
            key={i}
            x1="62"
            y1={22 + y}
            x2="138"
            y2={22 + y}
            stroke={ILU.line}
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        <text x="72" y="48" fontSize="8" fontWeight="700" fill={ILU.ink}>
          見積書
        </text>
        <text x="72" y="65" fontSize="6" fill={ILU.ink} opacity="0.5">
          工事一式　￥—
        </text>
        <g transform="translate(100 90) rotate(-18)">
          <rect
            x="-32"
            y="-14"
            width="64"
            height="28"
            rx="2"
            fill="none"
            stroke="#C81E3A"
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#C81E3A"
          >
            差戻
          </text>
        </g>
        <path
          d="M42 68 L28 68 M32 64 L28 68 L32 72"
          stroke={ILU.warn}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
    confused: (
      <g>
        <g transform="translate(100 78)">
          <WorkerHeadInline />
        </g>
        <text x="40" y="40" fontSize="24" fontWeight="900" fill={ILU.brand} opacity="0.85">
          ?
        </text>
        <text x="150" y="50" fontSize="18" fontWeight="900" fill={ILU.helmet} opacity="0.85">
          ?
        </text>
        <text x="160" y="96" fontSize="14" fontWeight="900" fill={ILU.brand} opacity="0.75">
          ?
        </text>
      </g>
    ),
    excel: (
      <g>
        <rect
          x="28"
          y="30"
          width="144"
          height="90"
          rx="4"
          fill="#fff"
          stroke={ILU.line}
          strokeWidth="1.5"
        />
        <rect x="28" y="30" width="144" height="14" fill="#E8EDF6" />
        {Array.from({ length: 5 }).map((_, c) => (
          <line
            key={`c${c}`}
            x1={28 + (c + 1) * 28.8}
            y1="30"
            x2={28 + (c + 1) * 28.8}
            y2="120"
            stroke={ILU.line}
            strokeWidth="0.8"
            opacity="0.35"
          />
        ))}
        {Array.from({ length: 4 }).map((_, r) => (
          <line
            key={`r${r}`}
            x1="28"
            y1={44 + (r + 1) * 18}
            x2="172"
            y2={44 + (r + 1) * 18}
            stroke={ILU.line}
            strokeWidth="0.8"
            opacity="0.35"
          />
        ))}
        <rect
          x="85"
          y="62"
          width="28"
          height="18"
          fill={ILU.amber}
          stroke={ILU.warn}
          strokeWidth="1.5"
        />
        <line
          x1="98"
          y1="66"
          x2="98"
          y2="76"
          stroke={ILU.ink}
          strokeWidth="1.5"
        />
        <g transform="translate(165 22)">
          <circle cx="0" cy="0" r="12" fill={ILU.helmet} />
          <path
            d="M0 -6 L0 0 L4 4"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
    ),
    offsite: (
      <g>
        <rect x="75" y="20" width="50" height="100" rx="8" fill={ILU.ink} />
        <rect x="79" y="26" width="42" height="82" rx="3" fill={ILU.paper} />
        <rect x="94" y="112" width="12" height="3" rx="1.5" fill="#fff" opacity="0.4" />
        <g transform="translate(100 67)">
          <circle r="16" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
          <path
            d="M-8 -8 L8 8 M8 -8 L-8 8"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
        <g transform="translate(30 96)">
          <rect x="0" y="0" width="22" height="22" fill={ILU.brandLight} />
          <rect x="3" y="3" width="5" height="5" fill="#fff" />
          <rect x="14" y="3" width="5" height="5" fill="#fff" />
          <rect x="3" y="14" width="5" height="5" fill="#fff" />
          <rect x="14" y="14" width="5" height="5" fill="#fff" />
        </g>
        <g transform="translate(155 100)">
          <polygon points="0,18 10,0 20,18" fill={ILU.helmet} />
          <rect x="7" y="10" width="6" height="8" fill={ILU.helmetDark} />
        </g>
      </g>
    ),
    calc: (
      <g>
        <rect
          x="56"
          y="18"
          width="88"
          height="112"
          rx="8"
          fill="#fff"
          stroke={ILU.line}
          strokeWidth="1.5"
        />
        <rect x="64" y="26" width="72" height="22" rx="3" fill={ILU.ink} />
        <text
          x="132"
          y="42"
          textAnchor="end"
          fontSize="12"
          fontWeight="700"
          fill={ILU.helmet}
        >
          6.00%
        </text>
        {[0, 1, 2, 3].flatMap((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={64 + c * 24}
              y={56 + r * 18}
              width="20"
              height="14"
              rx="2"
              fill={ILU.brand50}
              stroke={ILU.brandLight}
              strokeWidth="1"
            />
          )),
        )}
        <rect x="112" y="56" width="20" height="32" rx="2" fill={ILU.helmet} />
        <text
          x="122"
          y="77"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#fff"
        >
          +
        </text>
        <rect x="112" y="92" width="20" height="32" rx="2" fill={ILU.brand} />
        <text
          x="122"
          y="113"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#fff"
        >
          =
        </text>
      </g>
    ),
    expensive: (
      <g>
        <rect
          x="38"
          y="46"
          width="124"
          height="70"
          rx="6"
          fill="#fff"
          stroke={ILU.line}
          strokeWidth="1.5"
        />
        <text
          x="100"
          y="72"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={ILU.muted}
          opacity="0.55"
        >
          ¥9,800〜
        </text>
        <text
          x="100"
          y="94"
          textAnchor="middle"
          fontSize="9"
          fill={ILU.muted}
          opacity="0.55"
        >
          大手ソフト
        </text>
        <line
          x1="48"
          y1="80"
          x2="152"
          y2="75"
          stroke="#DC2626"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <g transform="translate(148 30)">
          <circle cx="0" cy="0" r="14" fill={ILU.helmet} />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#fff"
          >
            ¥
          </text>
        </g>
      </g>
    ),
    lawCheck: (
      <g>
        <g transform="translate(100 70)">
          <path
            d="M-30 -34 L0 -44 L30 -34 L30 14 Q30 36 0 50 Q-30 36 -30 14 Z"
            fill={ILU.brand}
          />
          <path
            d="M-14 2 L-4 12 L18 -14"
            stroke="#fff"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x="30"
          y="34"
          fontSize="10"
          fontWeight="700"
          fill={ILU.brand}
          opacity="0.6"
        >
          2025.12
        </text>
        <rect x="160" y="96" width="32" height="14" rx="7" fill={ILU.ok} />
        <text
          x="176"
          y="107"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="#fff"
        >
          準拠
        </text>
      </g>
    ),
    presets: (
      <g>
        {[
          { x: 30, y: 22, label: "電気", color: ILU.helmet },
          { x: 78, y: 22, label: "水道", color: ILU.brand },
          { x: 126, y: 22, label: "内装", color: ILU.brandLight },
          { x: 30, y: 56, label: "土木", color: ILU.brand },
          { x: 78, y: 56, label: "外構", color: ILU.helmet, big: true },
          { x: 126, y: 56, label: "大工", color: ILU.brandLight },
          { x: 30, y: 90, label: "左官", color: ILU.brandLight },
          { x: 78, y: 90, label: "鳶足場", color: ILU.brand },
        ].map((t, i) => (
          <g key={i}>
            <rect
              x={t.x}
              y={t.y}
              width={t.big ? 44 : 40}
              height={t.big ? 30 : 26}
              rx="4"
              fill={t.big ? t.color : "#fff"}
              stroke={t.color}
              strokeWidth="1.5"
            />
            <text
              x={t.x + (t.big ? 22 : 20)}
              y={t.y + (t.big ? 20 : 17)}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill={t.big ? "#fff" : t.color}
            >
              {t.label}
            </text>
          </g>
        ))}
        <text
          x="150"
          y="130"
          fontSize="8"
          fontWeight="700"
          fill={ILU.brand}
          opacity="0.6"
        >
          1クリック
        </text>
      </g>
    ),
    autocalc: (
      <g>
        <rect
          x="18"
          y="40"
          width="56"
          height="60"
          rx="6"
          fill="#fff"
          stroke={ILU.line}
          strokeWidth="1.5"
        />
        <text
          x="46"
          y="60"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill={ILU.muted}
        >
          直接費
        </text>
        <text
          x="46"
          y="82"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill={ILU.ink}
        >
          ¥1,000
        </text>
        <path
          d="M78 70 L98 70 M94 66 L98 70 L94 74"
          stroke={ILU.brand}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g transform="translate(108 40)">
          <rect x="0" y="0" width="74" height="60" rx="6" fill={ILU.brand} />
          <text
            x="37"
            y="18"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="#fff"
            opacity="0.8"
          >
            現場 6%
          </text>
          <text
            x="37"
            y="32"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="#fff"
            opacity="0.8"
          >
            一般 10%
          </text>
          <line x1="8" y1="38" x2="66" y2="38" stroke="#fff" strokeWidth="0.8" opacity="0.5" />
          <text
            x="37"
            y="52"
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#fff"
          >
            ¥1,160
          </text>
        </g>
      </g>
    ),
    phone: (
      <g>
        <rect x="65" y="14" width="70" height="112" rx="10" fill={ILU.ink} />
        <rect x="69" y="22" width="62" height="92" rx="4" fill="#fff" />
        <rect x="69" y="22" width="62" height="14" fill={ILU.brand} />
        <text
          x="100"
          y="32"
          textAnchor="middle"
          fontSize="7"
          fontWeight="700"
          fill="#fff"
        >
          見積書
        </text>
        {[44, 52, 60, 68, 76].map((y, i) => (
          <rect
            key={i}
            x="74"
            y={y}
            width={[50, 40, 46, 34, 42][i]}
            height="3"
            rx="1.5"
            fill={ILU.line}
          />
        ))}
        <rect x="74" y="88" width="52" height="18" rx="2" fill={ILU.amber} />
        <text
          x="100"
          y="100"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill={ILU.warn}
        >
          ¥ 1,160,000
        </text>
        <rect x="92" y="118" width="16" height="3" rx="1.5" fill="#fff" opacity="0.4" />
        <circle cx="125" cy="75" r="12" fill={ILU.helmet} opacity="0.25" />
        <circle cx="125" cy="75" r="6" fill={ILU.helmet} />
      </g>
    ),
    rocket: (
      <g>
        {[
          { x: 30, n: "1", label: "開く" },
          { x: 88, n: "2", label: "入力" },
          { x: 146, n: "3", label: "PDF" },
        ].map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy="70" r="18" fill={i === 2 ? ILU.helmet : ILU.brand} />
            <text
              x={s.x}
              y="75"
              textAnchor="middle"
              fontSize="14"
              fontWeight="900"
              fill="#fff"
            >
              {s.n}
            </text>
            <text
              x={s.x}
              y="104"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill={ILU.ink}
            >
              {s.label}
            </text>
          </g>
        ))}
        <path
          d="M52 70 L66 70 M62 66 L66 70 L62 74"
          stroke={ILU.brandLight}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M110 70 L124 70 M120 66 L124 70 L120 74"
          stroke={ILU.brandLight}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g transform="translate(100 26)">
          <rect
            x="-36"
            y="-10"
            width="72"
            height="20"
            rx="10"
            fill="#fff"
            stroke={ILU.ok}
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill={ILU.ok}
          >
            登録・カード不要
          </text>
        </g>
      </g>
    ),
    cloud: (
      <g>
        <path
          d="M60 70 Q40 70 40 86 Q40 102 60 102 L140 102 Q160 102 160 84 Q160 66 140 66 Q138 50 120 50 Q100 50 96 66 Q80 66 72 70 Z"
          fill={ILU.brand50}
          stroke={ILU.brand}
          strokeWidth="2"
        />
        <g transform="translate(100 85)">
          <rect
            x="-22"
            y="-14"
            width="30"
            height="38"
            rx="2"
            fill="#fff"
            stroke={ILU.line}
            strokeWidth="1"
            transform="rotate(-8)"
          />
          <rect
            x="-14"
            y="-16"
            width="30"
            height="38"
            rx="2"
            fill="#fff"
            stroke={ILU.line}
            strokeWidth="1"
          />
          <rect
            x="-6"
            y="-18"
            width="30"
            height="38"
            rx="2"
            fill="#fff"
            stroke={ILU.brand}
            strokeWidth="1.5"
            transform="rotate(8)"
          />
        </g>
        <g transform="translate(100 30)">
          <path
            d="M0 8 L0 -8 M-5 -3 L0 -8 L5 -3"
            stroke={ILU.helmet}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    ),
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block" }}
      role="img"
      aria-hidden
    >
      <rect x="0" y="0" width={W} height={H} rx="10" fill={ILU.brand50} />
      <g opacity="0.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 16 + 4}
            y1="0"
            x2={i * 16 + 4}
            y2={H}
            stroke={ILU.brandLight}
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 16 + 4}
            x2={W}
            y2={i * 16 + 4}
            stroke={ILU.brandLight}
            strokeWidth="0.5"
          />
        ))}
      </g>
      {scenes[kind]}
    </svg>
  );
}

export function IluHeroKeyArt() {
  return (
    <svg
      viewBox="0 0 520 540"
      width="100%"
      style={{ display: "block" }}
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EEF3FF" />
          <stop offset="100%" stopColor="#DCE6FF" />
        </linearGradient>
        <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M20 0 L0 0 0 20"
            fill="none"
            stroke="#9CB5F0"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </pattern>
      </defs>
      <circle cx="260" cy="270" r="230" fill="url(#heroBg)" />
      <circle cx="260" cy="270" r="230" fill="url(#heroGrid)" />

      {/* floating doc top-left */}
      <g transform="translate(80 110) rotate(-8)">
        <rect
          x="0"
          y="0"
          width="150"
          height="190"
          rx="6"
          fill="#fff"
          stroke={ILU.line}
          strokeWidth="1.5"
        />
        <rect x="0" y="0" width="150" height="28" rx="6" fill={ILU.brand} />
        <text x="16" y="19" fontSize="11" fontWeight="700" fill="#fff">
          見積書 #0138
        </text>
        {[44, 54, 64, 74, 86].map((y, i) => (
          <g key={i}>
            <rect x="14" y={y} width="80" height="3" rx="1.5" fill={ILU.line} />
            <rect x="102" y={y} width="36" height="3" rx="1.5" fill={ILU.line} opacity="0.6" />
          </g>
        ))}
        {["労務費", "材料費", "外注費"].map((label, i) => (
          <g key={label} transform={`translate(14 ${110 + i * 14})`}>
            <rect x="0" y="0" width="6" height="6" rx="1" fill={ILU.ok} />
            <text x="12" y="6" fontSize="8" fontWeight="700" fill={ILU.ink}>
              {label}
            </text>
            <rect x="80" y="1" width="40" height="4" rx="1" fill={ILU.line} />
          </g>
        ))}
        <rect x="14" y="160" width="122" height="16" rx="2" fill={ILU.amber} />
        <text x="20" y="171" fontSize="10" fontWeight="700" fill={ILU.warn}>
          合計 ¥1,160,000
        </text>
        <g transform="translate(122 150) rotate(-12)">
          <circle r="18" fill="none" stroke={ILU.ok} strokeWidth="2" />
          <text y="5" textAnchor="middle" fontSize="12" fontWeight="900" fill={ILU.ok}>
            OK
          </text>
        </g>
      </g>

      {/* worker figure */}
      <g transform="translate(260 300)">
        <ellipse cx="0" cy="210" rx="90" ry="10" fill={ILU.ink} opacity="0.1" />
        <path
          d="M-70 10 Q-70 -10 -40 -14 L40 -14 Q70 -10 70 10 L76 180 Q76 200 56 200 L-56 200 Q-76 200 -76 180 Z"
          fill={ILU.uniform}
        />
        <rect x="-76" y="70" width="152" height="10" fill="#FDE68A" />
        <rect x="-76" y="82" width="152" height="3" fill={ILU.helmetDark} />
        <path d="M-24 -14 L0 14 L24 -14 Z" fill={ILU.uniformDark} />
        <path d="M-14 -12 L0 6 L14 -12 Z" fill="#fff" />
        <path
          d="M-70 20 Q-90 50 -80 100 L-60 95 Q-56 60 -44 25 Z"
          fill={ILU.uniform}
        />
        <path
          d="M70 20 Q90 50 80 100 L60 95 Q56 60 44 25 Z"
          fill={ILU.uniform}
        />

        <g transform="translate(-72 95)">
          <ellipse cx="0" cy="0" rx="14" ry="11" fill={ILU.skin} />
          <g transform="translate(4 -28) rotate(-12)">
            <rect x="0" y="0" width="52" height="86" rx="7" fill={ILU.ink} />
            <rect x="3" y="6" width="46" height="70" rx="3" fill="#fff" />
            <rect x="3" y="6" width="46" height="10" fill={ILU.brand} />
            <text
              x="26"
              y="14"
              textAnchor="middle"
              fontSize="6"
              fontWeight="700"
              fill="#fff"
            >
              ケンミツ
            </text>
            {[22, 28, 34, 40, 46, 52, 58].map((y, i) => (
              <rect
                key={i}
                x="6"
                y={y}
                width={[32, 20, 28, 34, 22, 30, 18][i]}
                height="1.8"
                rx="0.8"
                fill={ILU.line}
              />
            ))}
            <rect x="6" y="65" width="40" height="8" rx="2" fill={ILU.helmet} />
          </g>
        </g>
        <g transform="translate(70 95)">
          <circle cx="0" cy="0" r="11" fill={ILU.skin} />
        </g>

        <g transform="translate(0 -70)">
          <rect x="-14" y="18" width="28" height="20" fill={ILU.skinShadow} />
          <circle cx="0" cy="0" r="44" fill={ILU.skin} />
          <path
            d="M-52 -12 Q-52 -54 0 -54 Q52 -54 52 -12 L52 -6 L-52 -6 Z"
            fill={ILU.helmet}
          />
          <path
            d="M-4 -54 L4 -54 L4 -14 L-4 -14 Z"
            fill={ILU.helmetDark}
            opacity="0.55"
          />
          <rect x="-56" y="-8" width="112" height="6" rx="2" fill={ILU.helmetDark} />
          <path
            d="M-42 -8 Q0 12 42 -8 L42 -34 L-42 -34 Z"
            fill={ILU.skinShadow}
            opacity="0.3"
          />
          <circle cx="-14" cy="2" r="2.2" fill={ILU.ink} />
          <circle cx="14" cy="2" r="2.2" fill={ILU.ink} />
          <path
            d="M-10 14 Q0 22 10 14"
            stroke={ILU.ink}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="-10" y="-40" width="20" height="10" rx="2" fill="#fff" />
          <text
            y="-32"
            textAnchor="middle"
            fontSize="7"
            fontWeight="900"
            fill={ILU.brand}
          >
            KM
          </text>
        </g>
      </g>

      {/* floating ¥980 badge top-right */}
      <g transform="translate(400 90)">
        <circle r="58" fill={ILU.helmet} />
        <circle
          r="58"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.6"
          transform="scale(0.82)"
        />
        <text y="-6" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1A1200">
          月額たった
        </text>
        <text y="20" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1A1200">
          ¥980
        </text>
        <text
          y="38"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#1A1200"
          opacity="0.7"
        >
          〜
        </text>
      </g>

      {/* check bubble bottom-left */}
      <g transform="translate(90 440)">
        <rect
          x="-60"
          y="-18"
          width="180"
          height="40"
          rx="20"
          fill="#fff"
          style={{ filter: "drop-shadow(0 6px 16px rgba(30,64,175,0.15))" }}
        />
        <g transform="translate(-42 2)">
          <circle r="12" fill={ILU.ok} />
          <path
            d="M-5 0 L-1 4 L6 -4"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        <text x="-22" y="-2" fontSize="11" fontWeight="700" fill={ILU.ink}>
          労務費の内訳
        </text>
        <text x="-22" y="14" fontSize="11" fontWeight="700" fill={ILU.ok}>
          自動チェック済
        </text>
      </g>
    </svg>
  );
}
