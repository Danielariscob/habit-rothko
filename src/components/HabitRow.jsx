import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import IconRenderer from './IconRenderer'
import { PALETTE } from '../data/palette'

export default function HabitRow({ habit, checked, onToggle }) {
  const color = PALETTE[habit.color]?.base || PALETTE.red.base
  const deep = PALETTE[habit.color]?.deep || PALETTE.red.deep

  return (
    <motion.button
      layout
      onClick={onToggle}
      whileTap={{ scale: 0.98 }}
      className="relative w-full overflow-hidden rounded-band shadow-band text-left"
      style={{
        background: `linear-gradient(135deg, ${deep}, ${color})`,
      }}
    >
      {/* pincelada de textura sutil */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[radial-gradient(circle_at_20%_20%,#fff,transparent_60%)]" />

      <div className="relative flex items-center gap-3 px-4 py-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/20">
          <IconRenderer name={habit.icon} size={19} className="text-rothko-cream" strokeWidth={1.75} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-body font-medium text-[15px] text-white">{habit.name}</p>
        </div>

        <motion.div
          initial={false}
          animate={{
            backgroundColor: checked ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.18)',
            borderColor: checked ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)',
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2"
        >
          <motion.span
            initial={false}
            animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          >
            <Check size={16} strokeWidth={3} style={{ color }} />
          </motion.span>
        </motion.div>
      </div>
    </motion.button>
  )
}
