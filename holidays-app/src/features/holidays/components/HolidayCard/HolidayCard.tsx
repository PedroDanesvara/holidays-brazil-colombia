import type { Holiday } from '../../types/holiday.types'
import { CountryColors, CountryLabels } from '../../types/holiday.types'
import { Card } from '@/components/ui/Card'
import { formatFullDate } from '../../utils/dateUtils'
import { motion } from 'framer-motion'

interface HolidayCardProps {
  holiday: Holiday
  showWeek?: boolean
}

export function HolidayCard({ holiday, showWeek = true }: HolidayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hoverable className="group">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#47A1C3] transition-colors">
              {holiday.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-3 py-1 text-xs font-medium text-white rounded-full"
                style={{ backgroundColor: CountryColors[holiday.country] }}
              >
                {CountryLabels[holiday.country]}
              </span>
            </div>
            
            <p className="text-sm text-gray-600">
              {formatFullDate(holiday.date)}
            </p>
            
            {holiday.description && (
              <p className="text-sm text-gray-500 mt-2">
                {holiday.description}
              </p>
            )}
          </div>
          
          {showWeek && (
            <div className="flex flex-col items-center bg-[#E8F2FF] px-4 py-2 rounded-lg">
              <span className="text-xs text-gray-600">Week</span>
              <span className="text-lg font-bold text-[#47A1C3]">
                {holiday.week}
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

