import { Checkbox } from '@/components/ui/Checkbox'
import { useStore } from '@/store'
import { Country, CountryLabels } from '@/features/holidays/types/holiday.types'
import { useFilterActions } from '../../hooks/useFilterActions'

export function CountryFilter() {
  const countries = useStore((state) => state.filters.countries)
  const { toggleCountry } = useFilterActions()

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        Countries
      </label>
      <div className="flex gap-4">
        <Checkbox
          checked={countries[Country.BRAZIL]}
          onChange={() => toggleCountry(Country.BRAZIL)}
          label={CountryLabels[Country.BRAZIL]}
        />
        <Checkbox
          checked={countries[Country.COLOMBIA]}
          onChange={() => toggleCountry(Country.COLOMBIA)}
          label={CountryLabels[Country.COLOMBIA]}
        />
      </div>
    </div>
  )
}

