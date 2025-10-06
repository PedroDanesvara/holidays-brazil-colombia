import { CountryFilter } from '../CountryFilter'
import { DateFilter } from '../DateFilter'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { useFilterActions } from '../../hooks/useFilterActions'

export function FilterBar() {
  const { resetFilters } = useFilterActions()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-4">
          {/* Country Filters */}
          <CountryFilter />
          
          {/* Date Filters */}
          <DateFilter />
          
          {/* Actions */}
          <div className="flex items-end">
            <Button
              variant="danger"
              onClick={resetFilters}
              leftIcon={<RotateCcw size={16} />}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

