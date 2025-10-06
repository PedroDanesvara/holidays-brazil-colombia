import type { HolidayStats as HolidayStatsType } from '../../types/holiday.types'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

interface HolidayStatsProps {
  stats: HolidayStatsType
}

export function HolidayStats({ stats }: HolidayStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="text-center">
          <div className="py-4">
            <span className="block text-4xl font-bold text-[#47A1C3] mb-2">
              {stats.total}
            </span>
            <span className="text-sm text-gray-600 uppercase tracking-wide">
              Total Holidays
            </span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="text-center">
          <div className="py-4">
            <span className="block text-4xl font-bold text-[#47A1C3] mb-2">
              {stats.filtered}
            </span>
            <span className="text-sm text-gray-600 uppercase tracking-wide">
              Filtered Results
            </span>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

