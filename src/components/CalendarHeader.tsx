import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  nextMonth: () => void;
  prevMonth: () => void;
}

export default function CalendarHeader({ currentMonth, nextMonth, prevMonth }: CalendarHeaderProps) {
  return (
    <div className="relative h-64 md:h-80 w-full bg-gray-100 overflow-hidden group">
      {/* Background Mountain Image */}
      <img
        src="https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2000&auto=format&fit=crop"
        alt="Mountain Climber"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Angular Blue Overlay (Matches the design) */}
      <div 
        className="absolute bottom-0 w-full h-40 bg-[#1da1f2]" 
        style={{ clipPath: 'polygon(0 60%, 35% 100%, 100% 15%, 100% 100%, 0 100%)' }}
      ></div>

      {/* Month & Year Text */}
      <div className="absolute bottom-6 right-8 text-right text-white">
        <div className="text-2xl font-light tracking-wide">{format(currentMonth, 'yyyy')}</div>
        <div className="text-4xl font-bold tracking-wider uppercase leading-none">
          {format(currentMonth, 'MMMM')}
        </div>
      </div>

      {/* Navigation Buttons (Appear on hover for cleaner UI) */}
      <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={prevMonth} 
          className="p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextMonth} 
          className="p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}