import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import IconRenderer from './IconRenderer'
import { PALETTE, PALETTE_KEYS, ICON_CHOICES } from '../data/palette'
import { DIAS } from '../utils/dates'

export default function HabitForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || '')
  const [icon, setIcon] = useState(initial?.icon || ICON_CHOICES[0])
  const [color, setColor] = useState(initial?.color || 'red')
  const [days, setDays] = useState(initial?.days || [0, 1, 2, 3, 4])

  const toggleDay = (i) => {
    setDays((prev) => (prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i].sort()))
  }

  const handleSave = () => {
    if (!name.trim()) return
    onSave({ name: name.trim(), icon, color, days })
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="overflow-hidden rounded-band bg-white/[0.04] p-4"
    >
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del hábito"
        className="w-full rounded-xl bg-white/[0.06] px-3.5 py-2.5 text-[15px] text-rothko-cream placeholder:text-rothko-cream/30 outline-none focus:ring-1 focus:ring-rothko-cream/30"
      />

      <p className="mt-4 mb-2 text-[11px] uppercase tracking-wider text-rothko-cream/40">Ícono</p>
      <div className="flex flex-wrap gap-2">
        {ICON_CHOICES.map((ic) => (
          <button
            key={ic}
            onClick={() => setIcon(ic)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              icon === ic ? 'bg-rothko-cream text-rothko-bg' : 'bg-white/[0.06] text-rothko-cream/60'
            }`}
          >
            <IconRenderer name={ic} size={16} strokeWidth={2} />
          </button>
        ))}
      </div>

      <p className="mt-4 mb-2 text-[11px] uppercase tracking-wider text-rothko-cream/40">Color</p>
      <div className="flex gap-2.5">
        {PALETTE_KEYS.map((k) => (
          <button
            key={k}
            onClick={() => setColor(k)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: PALETTE[k].base }}
          >
            {color === k && <Check size={16} strokeWidth={3} className="text-white" />}
          </button>
        ))}
      </div>

      <p className="mt-4 mb-2 text-[11px] uppercase tracking-wider text-rothko-cream/40">Días</p>
      <div className="flex gap-1.5">
        {DIAS.map((d, i) => (
          <button
            key={d}
            onClick={() => toggleDay(i)}
            className={`flex h-9 flex-1 items-center justify-center rounded-lg text-xs font-medium transition ${
              days.includes(i) ? 'text-rothko-bg' : 'bg-white/[0.06] text-rothko-cream/50'
            }`}
            style={days.includes(i) ? { backgroundColor: PALETTE[color].base } : {}}
          >
            {d[0]}
          </button>
        ))}
      </div>

      <div className="mt-5 flex gap-2.5">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl bg-white/[0.06] py-2.5 text-sm text-rothko-cream/70"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="flex-1 rounded-xl py-2.5 text-sm font-medium text-white"
          style={{ backgroundColor: PALETTE[color].base }}
        >
          Guardar
        </button>
      </div>
    </motion.div>
  )
}
