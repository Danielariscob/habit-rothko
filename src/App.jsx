import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from './components/BottomNav'
import DailyView from './components/DailyView'
import WeeklyView from './components/WeeklyView'
import HabitsView from './components/HabitsView'
import { useHabits } from './data/useHabits'

export default function App() {
  const [tab, setTab] = useState('daily')
  const habitsData = useHabits()

  return (
    <div className="mx-auto min-h-screen max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {tab === 'daily' && (
            <DailyView
              habitsForDay={habitsData.habitsForDay}
              isCompleted={habitsData.isCompleted}
              toggleCompletion={habitsData.toggleCompletion}
              dailyProgress={habitsData.dailyProgress}
            />
          )}
          {tab === 'weekly' && (
            <WeeklyView
              habits={habitsData.habits}
              isCompleted={habitsData.isCompleted}
              toggleCompletion={habitsData.toggleCompletion}
              weeklyProgress={habitsData.weeklyProgress}
            />
          )}
          {tab === 'habits' && (
            <HabitsView
              habits={habitsData.habits}
              addHabit={habitsData.addHabit}
              updateHabit={habitsData.updateHabit}
              deleteHabit={habitsData.deleteHabit}
              exportData={habitsData.exportData}
              importData={habitsData.importData}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}
