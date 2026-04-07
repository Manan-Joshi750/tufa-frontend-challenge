import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, isBefore } from 'date-fns';

interface CalendarGridProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

export default function CalendarGrid({ currentMonth, startDate, endDate, setStartDate, setEndDate }: CalendarGridProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  
  // Start week on Monday (weekStarts: 1) to perfectly match the reference image
  const startDateGrid = startOfWeek(monthStart, { weekStartsOn: 1 }); 
  const endDateGrid = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDateGrid, end: endDateGrid });
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const onDateClick = (day: Date) => {
    // Only allow clicking days in the current month
    if (!isSameMonth(day, monthStart)) return;

    if (!startDate || (startDate && endDate)) {
      // Start a new selection range
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // Complete the selection range
      if (isBefore(day, startDate)) {
        // If they click a date before the start date, make it the new start date
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4 text-center">
        {weekDays.map((day, i) => (
          <div key={day} className={`text-xs font-bold tracking-wider ${i >= 5 ? 'text-[#1da1f2]' : 'text-gray-800'}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-0 text-center text-sm">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelectedStart = startDate && isSameDay(day, startDate);
          const isSelectedEnd = endDate && isSameDay(day, endDate);
          const isBetween = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
          const isWeekend = day.getDay() === 0 || day.getDay() === 6; // 0 is Sunday, 6 is Saturday

          // Base styles
          let textClass = isCurrentMonth ? "text-gray-800 font-medium" : "text-gray-200 font-light";
          let bgClass = "bg-transparent";
          let roundedClass = "rounded-full";

          // Weekend styles (Blue text if in current month and not selected)
          if (isCurrentMonth && isWeekend && !isSelectedStart && !isSelectedEnd && !isBetween) {
            textClass = "text-[#1da1f2] font-bold";
          }

          // Selection styles
          if (isSelectedStart) {
            bgClass = "bg-[#1da1f2]";
            textClass = "text-white font-bold shadow-md";
            roundedClass = endDate ? "rounded-l-full rounded-r-none" : "rounded-full";
          } else if (isSelectedEnd) {
            bgClass = "bg-[#1da1f2]";
            textClass = "text-white font-bold shadow-md";
            roundedClass = "rounded-r-full rounded-l-none";
          } else if (isBetween) {
            bgClass = "bg-[#e8f5fe]"; // Light blue background for the days in between
            textClass = "text-[#1da1f2] font-semibold";
            roundedClass = "rounded-none";
          }

          return (
            <div key={day.toString()} className={`relative flex justify-center items-center h-10 ${isBetween ? bgClass : ''}`}>
              <button
                onClick={() => onDateClick(day)}
                disabled={!isCurrentMonth}
                className={`w-10 h-10 flex items-center justify-center transition-all duration-200 
                  ${isSelectedStart || isSelectedEnd ? bgClass : ''} 
                  ${textClass} 
                  ${roundedClass}
                  ${isCurrentMonth && !isSelectedStart && !isSelectedEnd && !isBetween ? 'hover:bg-gray-100 hover:text-[#1da1f2] cursor-pointer' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}