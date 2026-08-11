import { useCallback, useEffect, useMemo, useState } from 'react'
import { toISODate } from '../utils/dates'

const HABITS_KEY = 'bandas.habits.v1'
const COMPLETIONS_KEY = 'bandas.completions.v1'

const SEED_HABITS = [
  { id: 'h1', name: 'Ejercicio', icon: 'Dumbbell', color: 'red', days: [0, 2, 4] },
  { id: 'h2', name: 'Leer', icon: 'BookOpen', color: 'purple', days: [0, 1, 2, 3, 4, 5, 6] },
  { id: 'h3', name: 'Tomar agua', icon: 'Droplet', color: 'green', days: [0, 1, 2, 3, 4, 5, 6] },
  { id: 'h4', name: 'Dormir temprano', icon: 'Moon', color: 'cream', days: [0, 1, 2, 3, 4] },
]

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function useHabits() {
  const [habits, setHabits] = useState(() => load(HABITS_KEY, SEED_HABITS))
  const [completions, setCompletions] = useState(() => load(COMPLETIONS_KEY, {}))

  useEffect(() => {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits))
  }, [habits])

  useEffect(() => {
    localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions))
  }, [completions])

  const addHabit = useCallback((habit) => {
    setHabits((prev) => [...prev, { ...habit, id: crypto.randomUUID() }])
  }, [])

  const updateHabit = useCallback((id, patch) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...patch } : h)))
  }, [])

  const deleteHabit = useCallback((id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id))
    setCompletions((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const toggleCompletion = useCallback((habitId, date) => {
    const iso = toISODate(date)
    setCompletions((prev) => {
      const forHabit = { ...(prev[habitId] || {}) }
      if (forHabit[iso]) {
        delete forHabit[iso]
      } else {
        forHabit[iso] = true
      }
      return { ...prev, [habitId]: forHabit }
    })
  }, [])

  const isCompleted = useCallback(
    (habitId, date) => !!completions[habitId]?.[toISODate(date)],
    [completions]
  )

  const habitsForDay = useCallback(
    (dayIndex) => habits.filter((h) => h.days.includes(dayIndex)),
    [habits]
  )

  const dailyProgress = useCallback(
    (date, dayIndex) => {
      const scheduled = habitsForDay(dayIndex)
      if (scheduled.length === 0) return { done: 0, total: 0, pct: 0 }
      const done = scheduled.filter((h) => isCompleted(h.id, date)).length
      return { done, total: scheduled.length, pct: Math.round((done / scheduled.length) * 100) }
    },
    [habitsForDay, isCompleted]
  )

  const weeklyProgress = useCallback(
    (weekDates) => {
      let done = 0
      let total = 0
      weekDates.forEach((date, dayIndex) => {
        const scheduled = habitsForDay(dayIndex)
        total += scheduled.length
        done += scheduled.filter((h) => isCompleted(h.id, date)).length
      })
      return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) }
    },
    [habitsForDay, isCompleted]
  )

  return useMemo(
    () => ({
      habits,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleCompletion,
      isCompleted,
      habitsForDay,
      dailyProgress,
      weeklyProgress,
    }),
    [habits, addHabit, updateHabit, deleteHabit, toggleCompletion, isCompleted, habitsForDay, dailyProgress, weeklyProgress]
  )
}
