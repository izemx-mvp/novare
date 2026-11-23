import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.65, 0, 0.35, 1] as const;

function Draw({
  d,
  delay = 0,
  className,
  strokeWidth = 1.4,
  dashed = false,
}: {
  d: string;
  delay?: number;
  className?: string;
  strokeWidth?: number;
  dashed?: boolean;
}) {
  return (
    <motion.path
      d={d}
      className={className}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? "4 6" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ pathLength: { duration: 1.2, ease, delay }, opacity: { duration: 0.3, delay } }}
    />
  );
}

/**
 * Evolving schematic for the "Notre méthode" storytelling:
 * 0 plan → 1 networks → 2 power-on → 3 maintenance checks → 4 energy graph.
 */
export function BlueprintMethod({ step, className }: { step: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 520 520"
      className={cn("h-auto w-full", className)}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bm-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" stroke="#5a87a6" strokeOpacity="0.14" strokeWidth="1" />
        </pattern>
        <radialGradient id="bm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0078be" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0078be" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="520" height="520" fill="url(#bm-grid)" />
      <motion.circle
        cx="260"
        cy="260"
        r="230"
        fill="url(#bm-glow)"
        animate={{ opacity: 0.15 + step * 0.08 }}
        transition={{ duration: 0.8 }}
      />

      {/* 0 — floor plan (always visible) */}
      <g stroke="#9db8cc" strokeLinecap="round" strokeLinejoin="round">
        <Draw d="M70 110h380v320H70z" strokeWidth={1.6} />
        <Draw d="M70 250h170M300 250h150M240 110v90M240 250v180M340 250v180" delay={0.3} />
        <Draw d="M180 430v-24M200 430v-24M180 406h20" delay={0.5} strokeWidth={1} />
        <Draw
          d="M70 80h380M70 74v12M450 74v12M40 110v320M34 110h12M34 430h12"
          delay={0.6}
          strokeWidth={0.9}
        />
      </g>
      <motion.g
        fill="#9db8cc"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8 }}
      >
        <text x="232" y="70">
          18,40 m
        </text>
        <text x="100" y="180">
          SALLE
        </text>
        <text x="330" y="180">
          CUISINE
        </text>
        <text x="270" y="345">
          LOCAL TECH.
        </text>
        <text x="100" y="345">
          CHAMBRES
        </text>
      </motion.g>

      <AnimatePresence>
        {step >= 1 && (
          <motion.g
            key="networks"
            stroke="#2f9bdb"
            strokeLinecap="round"
            strokeLinejoin="round"
            exit={{ opacity: 0 }}
          >
            <Draw d="M290 400V140h120M290 220H110M150 220v-40M200 220v-40" strokeWidth={2} />
            <Draw d="M300 410v-30h120v-120M420 260h-60" delay={0.3} strokeWidth={2} dashed />
            <Draw d="M110 300h120v80h50" delay={0.5} strokeWidth={2} />
            <motion.circle
              cx="290"
              cy="400"
              r="10"
              stroke="#2f9bdb"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              style={{ transformOrigin: "290px 400px" }}
            />
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.g key="power" exit={{ opacity: 0 }}>
            <g stroke="#ffffff" strokeLinecap="round">
              <path
                d="M290 400V140h120M290 220H110"
                strokeWidth="1.6"
                className="flow-dash"
                opacity="0.8"
              />
              <path d="M110 300h120v80h50" strokeWidth="1.6" className="flow-dash" opacity="0.8" />
            </g>
            {[
              [290, 140],
              [410, 140],
              [110, 220],
              [150, 180],
              [200, 180],
              [110, 300],
              [280, 380],
            ].map(([cx = 0, cy = 0], i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <circle cx={cx} cy={cy} r="9" fill="#0078be" fillOpacity="0.25" />
                <circle cx={cx} cy={cy} r="4" fill="#ffffff" />
              </motion.g>
            ))}
            <motion.g
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <rect
                x="320"
                y="392"
                width="110"
                height="26"
                rx="13"
                fill="#0b1d3a"
                stroke="rgb(255 255 255 / 0.2)"
              />
              <circle cx="336" cy="405" r="4" fill="#2f9bdb" />
              <text
                x="346"
                y="409"
                fill="#fff"
                fontFamily="Space Grotesk, sans-serif"
                fontSize="10.5"
                fontWeight="600"
                letterSpacing="1"
              >
                EN SERVICE
              </text>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.g key="checks" exit={{ opacity: 0 }}>
            {[
              [410, 140],
              [150, 180],
              [110, 300],
              [420, 260],
            ].map(([cx = 0, cy = 0], i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 * i, type: "spring", stiffness: 260, damping: 18 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <circle cx={cx} cy={cy} r="15" fill="#0b1d3a" stroke="#2f9bdb" strokeWidth="1.5" />
                <path
                  d={`M${cx - 6} ${cy}l4 4 8-8`}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.g key="energy" exit={{ opacity: 0 }}>
            <motion.rect
              x="86"
              y="446"
              width="348"
              height="58"
              rx="14"
              fill="#0b1d3a"
              stroke="rgb(255 255 255 / 0.14)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <Draw
              d="M104 466c30 2 50 6 80 12s60 10 90 14 70 4 140 4"
              strokeWidth={2}
              className="stroke-primary-400"
            />
            <Draw d="M104 486h310" strokeWidth={0.8} className="stroke-steel-400" delay={0.2} />
            <motion.text
              x="300"
              y="462"
              fill="#6dbbea"
              fontFamily="Space Grotesk, sans-serif"
              fontSize="10.5"
              fontWeight="600"
              letterSpacing="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              CONSOMMATION ↓
            </motion.text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
