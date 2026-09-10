/**
 * Original, on-brand hero art for blog posts — flat-shaded SVG compositions
 * using only the site's own design tokens (no external images, no gradients
 * or shadows, per DESIGN.md). Each post gets a distinct abstract scene tied
 * to its topic. Purely decorative: hidden from assistive tech.
 */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[32px] bg-mist" aria-hidden>
      <svg viewBox="0 0 480 220" className="h-auto w-full" role="presentation">
        {children}
      </svg>
    </div>
  );
}

// A byte grid: 8 squares, one mint — echoes the homepage hero object.
function WhyStationEight() {
  const bits = [0, 0, 1, 1, 1, 0, 0, 0];
  return (
    <Frame>
      <rect x="0" y="0" width="480" height="220" className="fill-mist" />
      {bits.map((bit, i) => (
        <rect
          key={i}
          x={60 + i * 45}
          y="90"
          width="34"
          height="34"
          rx="6"
          className={i === 7 ? "fill-accent" : bit === 1 ? "fill-ink" : "fill-paper-elevated"}
        />
      ))}
      <rect x="60" y="40" width="326" height="6" rx="3" className="fill-ink/20" />
      <rect x="60" y="150" width="180" height="6" rx="3" className="fill-ink/20" />
    </Frame>
  );
}

// Ascending cost bars.
function CostBars() {
  const heights = [40, 65, 95, 130, 150];
  return (
    <Frame>
      <rect x="0" y="0" width="480" height="220" className="fill-mist" />
      {heights.map((h, i) => (
        <rect
          key={i}
          x={60 + i * 72}
          y={180 - h}
          width="44"
          height={h}
          rx="4"
          className={i === heights.length - 1 ? "fill-accent" : "fill-ink"}
        />
      ))}
      <rect x="40" y="180" width="400" height="3" className="fill-ink/30" />
    </Frame>
  );
}

// Two contrasting panels — off-the-shelf vs custom.
function SplitPanels() {
  return (
    <Frame>
      <rect x="0" y="0" width="240" height="220" className="fill-paper-elevated" />
      <rect x="240" y="0" width="240" height="220" className="fill-ink" />
      {[0, 1, 2].map((i) => (
        <rect key={`l${i}`} x="50" y={60 + i * 34} width="140" height="12" rx="6" className="fill-ink/25" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`r${i}`} x="290" y={60 + i * 34} width="140" height="12" rx="6" className="fill-accent" />
      ))}
    </Frame>
  );
}

// A checklist with a magnifier — choosing a partner.
function ChecklistScene() {
  return (
    <Frame>
      <rect x="0" y="0" width="480" height="220" className="fill-mist" />
      <rect x="70" y="45" width="260" height="130" rx="16" className="fill-paper-elevated" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="95" y={70 + i * 26} width="18" height="18" rx="4" className={i < 3 ? "fill-ink" : "fill-accent"} />
          <rect x="125" y={75 + i * 26} width="170" height="8" rx="4" className="fill-ink/25" />
        </g>
      ))}
      <circle cx="380" cy="130" r="34" className="fill-none stroke-ink" strokeWidth="10" />
      <line x1="404" y1="154" x2="430" y2="180" className="stroke-ink" strokeWidth="12" strokeLinecap="round" />
    </Frame>
  );
}

// Stacked layered cards — SaaS architecture layers.
function LayeredCards() {
  return (
    <Frame>
      <rect x="0" y="0" width="480" height="220" className="fill-mist" />
      <rect x="90" y="140" width="300" height="34" rx="10" className="fill-ink" />
      <rect x="110" y="100" width="260" height="34" rx="10" className="fill-paper-elevated" />
      <rect x="130" y="60" width="220" height="34" rx="10" className="fill-accent" />
    </Frame>
  );
}

// Browser window with layout blocks — web application.
function BrowserWindow() {
  return (
    <Frame>
      <rect x="0" y="0" width="480" height="220" className="fill-mist" />
      <rect x="60" y="40" width="360" height="150" rx="14" className="fill-paper-elevated" />
      <rect x="60" y="40" width="360" height="26" rx="14" className="fill-ink" />
      <circle cx="80" cy="53" r="4" className="fill-paper-elevated" />
      <circle cx="94" cy="53" r="4" className="fill-paper-elevated" />
      <circle cx="108" cy="53" r="4" className="fill-paper-elevated" />
      <rect x="80" y="86" width="140" height="80" rx="8" className="fill-ink/15" />
      <rect x="234" y="86" width="146" height="34" rx="8" className="fill-accent" />
      <rect x="234" y="132" width="146" height="34" rx="8" className="fill-ink/15" />
    </Frame>
  );
}

// A small node graph — AI / retrieval.
function NodeGraph() {
  const nodes = [
    [90, 110],
    [190, 60],
    [190, 160],
    [300, 60],
    [300, 160],
    [390, 110],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 5],
    [1, 2],
  ];
  return (
    <Frame>
      <rect x="0" y="0" width="480" height="220" className="fill-mist" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          className="stroke-ink/25"
          strokeWidth="3"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 16 : 12} className={i === 5 ? "fill-accent" : "fill-ink"} />
      ))}
    </Frame>
  );
}

// Two overlapping hexagons — frameworks/comparison (no logos, generic shapes).
function OverlappingHex() {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  return (
    <Frame>
      <rect x="0" y="0" width="480" height="220" className="fill-mist" />
      <polygon points={hex(200, 110, 78)} className="fill-ink/85" />
      <polygon points={hex(280, 110, 78)} className="fill-accent opacity-90" />
    </Frame>
  );
}

// Phone silhouette with an app grid.
function PhoneGrid() {
  return (
    <Frame>
      <rect x="0" y="0" width="480" height="220" className="fill-mist" />
      <rect x="185" y="20" width="110" height="180" rx="18" className="fill-paper-elevated" />
      <rect x="185" y="20" width="110" height="180" rx="18" className="fill-none stroke-ink/20" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={200 + (i % 2) * 42}
          y={45 + Math.floor(i / 2) * 42}
          width="30"
          height="30"
          rx="8"
          className={i === 3 ? "fill-accent" : "fill-ink"}
        />
      ))}
      <rect x="200" y="155" width="80" height="8" rx="4" className="fill-ink/25" />
    </Frame>
  );
}

const art: Record<string, () => React.ReactElement> = {
  "why-station-eight": WhyStationEight,
  "custom-software-development-cost": CostBars,
  "custom-software-vs-off-the-shelf": SplitPanels,
  "how-to-choose-a-software-development-company": ChecklistScene,
  "saas-product-development-cost": LayeredCards,
  "web-application-development-guide": BrowserWindow,
  "ai-powered-saas-application-guide": NodeGraph,
  "react-vs-nextjs": OverlappingHex,
  "mobile-app-development-cost": PhoneGrid,
};

export function BlogHeroArt({ slug }: { slug: string }) {
  const Art = art[slug];
  if (!Art) return null;
  return <Art />;
}
