'use client'

import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CalendarProps {
	value: Range
	disabledDates?: Date[]
	onChange: (value: RangeKeyDict) => void
}

const Calendar = ({ value, disabledDates, onChange }: CalendarProps) => {
	return (
		<div>
			<DateRange
				rangeColors={['#262626']}
				ranges={[value]}
				date={new Date()}
				onChange={onChange}
				direction="vertical"
				showDateDisplay={false}
				minDate={new Date()}
				disabledDates={disabledDates}
			/>
		</div>
	)
}

export default Calendar
