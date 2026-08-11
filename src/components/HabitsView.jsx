import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import IconRenderer from './IconRenderer'
import HabitForm from './HabitForm'
import { PALETTE } from '../data/palette'
import { DIAS } from '../utils/dates'

export default function HabitsView({ habits, addHabit, updateHabit, deleteHabit }) {
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)

  return (
    <div className="pb-28">
      {/* portada — el cuadro de Rothko usado como cabecera */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src="/icons/rothko-cover.jpg"
          alt="Portada"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rothko-bg via-rothko-bg/10 to-rothko-bg/40" />
        <div className="absolute bottom-3 left-5">
          <p className="font-display text-2xl text-white drop-shadow">Tus hábitos</p>
        </div>
      </div>

      <div className="px-5 pt-4 flex flex-col gap-3">
        {habits.map((h) => (
          <div key={h.id}>
            {editingId === h.id ? (
              <HabitForm
                initial={h}
                onCancel={() => setEditingId(null)}
                onSave={(patch) => {
                  updateHabit(h.id, patch)
                  setEditingId(null)
                }}
              />
            ) : (
              <div className="flex items-center gap-3 rounded-band bg-white/[0.04] px-4 py-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${PALETTE[h.color]?.base}33` }}
                >
                  <IconRenderer name={h.icon} size={18} style={{ color: PALETTE[h.color]?.base }} strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] text-rothko-cream">{h.name}</p>
                  <p className="truncate text-[11px] text-rothko-cream/40">
                    {h.days.length === 7 ? 'Todos los días' : h.days.map((d) => DIAS[d]).join(' · ')}
                  </p>
                </div>
                <button
                  onClick={() => setEditingId(h.id)}
                  className="p-2 text-rothko-cream/40 active:text-rothko-cream"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteHabit(h.id)}
                  className="p-2 text-rothko-cream/40 active:text-rothko-red"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}

        <AnimatePresence>
          {adding && (
            <HabitForm
              onCancel={() => setAdding(false)}
              onSave={(habit) => {
                addHabit(habit)
                setAdding(false)
              }}
            />
          )}
        </AnimatePresence>

        {!adding && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setAdding(true)}
            className="flex items-center justify-center gap-2 rounded-band border border-dashed border-rothko-cream/20 py-4 text-sm text-rothko-cream/60"
          >
            <Plus size={16} /> Nuevo hábito
          </motion.button>
        )}
      </div>
    </div>
  )
}
