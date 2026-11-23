import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.65, 0, 0.35, 1] as const;

type Network = {
  id: string;
  label: string;
  x: number;
  y: number;
  delay: number;
  paths: string[];
  flow: string;
  nodes: [number, number][];
};

// Building cross-section whose networks (HVAC, water, cold, power) light up in sequence.
const networks: Network[] = [
  {
    id: "cvc",
    label: "CVC",
    x: 300,
    y: 158,
    delay: 1.2,
    paths: [
      "M250 176h60v30h-60z",
      "M280 206v46H112M280 252h336",
      "M150 252v10M250 252v10M350 252v10M450 252v10M560 252v10",
      "M128 292c8-7 16 7 24 0s16 7 24 0M228 292c8-7 16 7 24 0s16 7 24 0M428 292c8-7 16 7 24 0s16 7 24 0M538 292c8-7 16 7 24 0",
    ],
    flow: "M280 206v46H112M280 252h336",
    nodes: [
      [280, 206],
      [150, 262],
      [450, 262],
    ],
  },
  {
    id: "eau",
    label: "EAU",
    x: 436,
    y: 402,
    delay: 1.9,
    paths: [
      "M600 518V330",
      "M600 352H470M600 442H470",
      "M470 352v18M470 442v18",
      "M540 468h44v48h-44zM548 478h28",
    ],
    flow: "M600 518V352H470",
    nodes: [
      [600, 352],
      [600, 442],
      [470, 370],
    ],
  },
  {
    id: "froid",
    label: "FROID",
    x: 106,
    y: 448,
    delay: 2.6,
    paths: ["M96 458h104v58H96z", "M148 470v34M134 478l28 18M162 478l-28 18", "M200 486h52v-46h40"],
    flow: "M200 486h52v-46h40",
    nodes: [
      [148, 487],
      [292, 440],
    ],
  },
  {
    id: "elec",
    label: "ÉLEC",
    x: 430,
    y: 492,
    delay: 3.3,
    paths: [
      "M318 462h40v54h-40z",
      "M326 474h24M326 486h24M326 498h24",
      "M338 462v-22h70v-88h-90v-18M408 352h70M408 440h120",
    ],
    flow: "M338 462v-22h70v-88h-90",
    nodes: [
      [338, 440],
      [408, 352],
      [318, 334],
      [528, 440],
    ],
  },
];

export function BlueprintBuilding({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const draw = (delay: number, duration = 1.4) =>
    reduce
      ? { initial: { pathLength: 1, opacity: 1 }, animate: { pathLength: 1, opacity: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration, ease, delay }, opacity: { duration: 0.3, delay } },
        };

  return (
    <svg
      viewBox="0 0 720 560"
      className={cn("h-auto w-full", className)}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0078be" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0078be" stopOpacity="0" />
        </radialGradient>
        <filter id="bb-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <pattern id="bb-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#9db8cc" opacity="0.25" />
        </pattern>
      </defs>

      <rect width="720" height="560" fill="url(#bb-dots)" opacity="0.6" />
      <ellipse cx="360" cy="320" rx="300" ry="220" fill="url(#bb-glow)" opacity="0.35" />

      {/* Structure */}
      <g stroke="#9db8cc" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <motion.path
          d="M76 518V240c0-10 5-18 13-23L347 50c8-5 18-5 26 0l258 167c8 5 13 13 13 23v278"
          {...draw(0, 1.8)}
        />
        <motion.path d="M30 518h660" {...draw(0.2, 1.4)} />
        <motion.path
          d="M76 240h568M76 330h568M76 420h568"
          strokeOpacity="0.55"
          {...draw(0.5, 1.4)}
        />
        <motion.path
          d="M210 240v278M420 240v278M520 330v188"
          strokeOpacity="0.45"
          {...draw(0.7, 1.2)}
        />
        <motion.path d="M30 540h660" strokeDasharray="3 6" strokeOpacity="0.4" {...draw(0.9, 1)} />
      </g>
      {/* Dimension marks */}
      <g stroke="#5a87a6" strokeWidth="0.8" opacity="0.7">
        <motion.path d="M52 240v278M46 240h12M46 518h12" {...draw(1, 0.8)} />
        <motion.path d="M76 34h568M76 28v12M644 28v12" {...draw(1, 0.8)} />
      </g>
      <motion.g
        fill="#9db8cc"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <text x="330" y="24">
          COUPE A-A
        </text>
        <text x="20" y="384" transform="rotate(-90 20 384)">
          R+2
        </text>
      </motion.g>

      {/* Networks */}
      {networks.map((net) => (
        <g key={net.id}>
          <g stroke="#6dbbea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {net.paths.map((d, i) => (
              <motion.path key={i} d={d} {...draw(net.delay + i * 0.12, 1.1)} />
            ))}
          </g>
          {/* glow + flow overlay once drawn */}
          <motion.path
            d={net.flow}
            stroke="#2f9bdb"
            strokeWidth="4"
            filter="url(#bb-blur)"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduce ? 0.5 : [0, 0.9, 0.45] }}
            transition={{ delay: net.delay + 1, duration: 1.2 }}
          />
          <motion.path
            d={net.flow}
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            className={reduce ? undefined : "flow-dash"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: net.delay + 1.1, duration: 0.6 }}
          />
          {net.nodes.map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="3.5"
              fill="#ffffff"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: net.delay + 0.9 + i * 0.1, duration: 0.4 }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
          <motion.g
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: net.delay + 0.8, duration: 0.5 }}
          >
            <rect
              x={net.x - 8}
              y={net.y - 14}
              width={net.label.length * 9 + 24}
              height="22"
              rx="11"
              fill="rgb(11 29 58 / 0.85)"
              stroke="rgb(255 255 255 / 0.18)"
            />
            <circle cx={net.x + 2} cy={net.y - 3} r="3" fill="#2f9bdb" />
            <text
              x={net.x + 10}
              y={net.y + 1}
              fill="#ffffff"
              fontFamily="Space Grotesk, sans-serif"
              fontSize="10.5"
              fontWeight="600"
              letterSpacing="1.5"
            >
              {net.label}
            </text>
          </motion.g>
        </g>
      ))}
    </svg>
  );
}
