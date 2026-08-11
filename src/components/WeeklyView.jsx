import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import IconRenderer from './IconRenderer'
import { DIAS, getWeekDates, isSameDay, startOfWeek } from '../utils/dates'
import { PALETTE } from '../data/palette'

export default function WeeklyView({ habits, isCompleted, toggleCompletion, weeklyProgress }) {
  const [anchor, setAnchor] = useState(() => new Date())
  const weekDates = getWeekDates(anchor)
  const { pct, done, total } = weeklyProgress(weekDates)
  const today = new Date()
  const isCurrentWeek = isSameDay(startOfWeek(anchor), startOfWeek(today))

  const shiftWeek = (delta) => {
    const d = new Date(anchor)
    d.setDate(d.getDate() + delta * 7)
    setAnchor(d)
  }

  return (
    <div className="px-5 pt-3 pb-28">
      <div className="flex items-center justify-between mb-1">
        <button onClick={() => shiftWeek(-1)} className="p-2 -ml-2 text-rothko-cream/50 active:text-rothko-cream">
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest text-rothko-cream/40">
            {isCurrentWeek ? 'Esta semana' : 'Semana'}
          </p>
          <p className="font-display text-lg text-rothko-cream">
            {weekDates[0].toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })} –{' '}
            {weekDates[6].toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })}
          </p>
        </div>
        <button
          onClick={() => shiftWeek(1)}
          disabled={isCurrentWeek}
          className="p-2 -mr-2 text-rothko-cream/50 active:text-rothko-cream disabled:opacity-20"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={weekDates[0].toDateString()}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
        >
          {/* banda de progreso semanal, tipo pincelada horizontal */}
          <div className="my-5">
            <div className="relative h-9 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${PALETTE.purple.base}, ${PALETTE.red.base})` }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <span className="text-xs font-medium text-white/90 mix-blend-difference">
                  {done} / {total} completados
                </span>
                <span className="font-display text-sm font-semibold text-white/90 mix-blend-difference">
                  {pct}%
                </span>
              </div>
            </div>
          </div>

          {/* encabezado de días */}
          <div className="grid grid-cols-[1fr_repeat(7,28px)] items-center gap-1.5 px-1 mb-2">
            <div />
            {DIAS.map((d, i) => (
              <div
                key={d}
                className={`text-center text-[10px] uppercase tracking-wide ${
                  isSameDay(weekDates[i], today) ? 'text-rothko-cream' : 'text-rothko-cream/35'
                }`}
              >
                {d[0]}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            {habits.map((h) => {
              const color = PALETTE[h.color]?.base || PALETTE.red.base
              return (
                <div
                  key={h.id}
                  className="grid grid-cols-[1fr_repeat(7,28px)] items-center gap-1.5 rounded-2xl bg-white/[0.035] px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${color}33` }}
                    >
                      <IconRenderer name={h.icon} size={14} style={{ color }} strokeWidth={2} />
                    </div>
                    <span className="truncate text-[13px] text-rothko-cream/85">{h.name}</span>
                  </div>

                  {weekDates.map((date, i) => {
                    const scheduled = h.days.includes(i)
                    const checked = isCompleted(h.id, date)
                    return (
                      <button
                        key={i}
                        disabled={!scheduled}
                        onClick={() => toggleCompletion(h.id, date)}
                        className="flex items-center justify-center"
                      >
                        <motion.div
                          whileTap={scheduled ? { scale: 0.85 } : {}}
                          animate={{
                            backgroundColor: checked ? color : scheduled ? `${color}22` : 'transparent',
                            borderColor: scheduled ? `${color}66` : 'rgba(255,255,255,0.08)',
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded-full border"
                        >
                          {checked && <Check size={12} strokeWidth={3} className="text-white" />}
                        </motion.div>
                      </button>
                    )
                  })}
                </div>
              )
            })}
            {habits.length === 0 && (
              <div className="text-center py-10 text-rothko-cream/40 text-sm">
                Aún no has creado hábitos. Ve a la pestaña "Hábitos".
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
