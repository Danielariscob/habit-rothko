import { motion } from 'framer-motion'

export default function ProgressRing({ pct = 0, size = 96, stroke = 9, color = '#d5410f', label, sub }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (pct / 100) * c }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-semibold text-rothko-cream leading-none">
          {pct}%
        </span>
        {label && <span className="text-[10px] uppercase tracking-wider text-rothko-cream/50 mt-1">{label}</span>}
        {sub && <span className="text-[10px] text-rothko-cream/40">{sub}</span>}
      </div>
    </div>
  )
}
