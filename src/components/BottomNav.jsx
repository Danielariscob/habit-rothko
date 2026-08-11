import { motion } from 'framer-motion'
import { CalendarCheck, CalendarRange, ListChecks } from 'lucide-react'

const TABS = [
  { key: 'daily', label: 'Hoy', icon: CalendarCheck },
  { key: 'weekly', label: 'Semana', icon: CalendarRange },
  { key: 'habits', label: 'Hábitos', icon: ListChecks },
]

export default function BottomNav({ active, onChange }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/[0.06] bg-rothko-bg/85 backdrop-blur-xl safe-bottom">
      <div className="mx-auto flex max-w-md items-center px-3 pt-2">
        {TABS.map((t) => {
          const isActive = active === t.key
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -top-2 h-1 w-8 rounded-full bg-rothko-red"
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.8}
                className={isActive ? 'text-rothko-cream' : 'text-rothko-cream/35'}
              />
              <span className={`text-[10px] ${isActive ? 'text-rothko-cream' : 'text-rothko-cream/35'}`}>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
