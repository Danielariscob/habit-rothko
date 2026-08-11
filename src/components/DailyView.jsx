import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HabitRow from './HabitRow'
import ProgressRing from './ProgressRing'
import { mondayIndex, formatHeaderDate, isSameDay } from '../utils/dates'
import { PALETTE } from '../data/palette'

export default function DailyView({ habitsForDay, isCompleted, toggleCompletion, dailyProgress }) {
  const [date, setDate] = useState(() => new Date())
  const dayIndex = mondayIndex(date)
  const scheduled = habitsForDay(dayIndex)
  const { pct, done, total } = dailyProgress(date, dayIndex)
  const today = isSameDay(date, new Date())

  const shiftDay = (delta) => {
    const d = new Date(date)
    d.setDate(d.getDate() + delta)
    setDate(d)
  }

  return (
    <div className="px-5 pt-3">
      <div className="flex items-center justify-between mb-1">
        <button onClick={() => shiftDay(-1)} className="p-2 -ml-2 text-rothko-cream/50 active:text-rothko-cream">
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-widest text-rothko-cream/40">
            {today ? 'Hoy' : formatHeaderDate(date)}
          </p>
          {today && <p className="font-display text-lg text-rothko-cream">{formatHeaderDate(date)}</p>}
        </div>
        <button onClick={() => shiftDay(1)} className="p-2 -mr-2 text-rothko-cream/50 active:text-rothko-cream">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center py-5">
        <ProgressRing pct={pct} size={128} stroke={10} color={PALETTE.red.base} sub={`${done} de ${total}`} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={date.toDateString()}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-3 pb-28"
        >
          {scheduled.length === 0 && (
            <div className="text-center py-10 text-rothko-cream/40 text-sm">
              No tienes hábitos programados este día.
            </div>
          )}
          {scheduled.map((h) => (
            <HabitRow
              key={h.id}
              habit={h}
              checked={isCompleted(h.id, date)}
              onToggle={() => toggleCompletion(h.id, date)}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
