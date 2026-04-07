"use client";

import { useState, useEffect } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // Upgrade: Store an object of notes instead of a single string
  const [allNotes, setAllNotes] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedNotes = localStorage.getItem('tufa_all_notes'); // New storage key
    const savedStart = localStorage.getItem('tufa_start');
    const savedEnd = localStorage.getItem('tufa_end');

    if (savedNotes) setAllNotes(JSON.parse(savedNotes));
    if (savedStart) setStartDate(new Date(savedStart));
    if (savedEnd) setEndDate(new Date(savedEnd));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    localStorage.setItem('tufa_all_notes', JSON.stringify(allNotes));
    
    if (startDate) {
      localStorage.setItem('tufa_start', startDate.toISOString());
    } else {
      localStorage.removeItem('tufa_start');
    }
    
    if (endDate) {
      localStorage.setItem('tufa_end', endDate.toISOString());
    } else {
      localStorage.removeItem('tufa_end');
    }
  }, [allNotes, startDate, endDate, isMounted]);

  // Determine which note to show: 
  // If a date is selected, use that date. Otherwise, use the current month.
  const currentNoteKey = startDate 
    ? format(startDate, 'yyyy-MM-dd') 
    : format(currentMonth, 'yyyy-MM');

  const currentDisplayedNote = allNotes[currentNoteKey] || "";

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAllNotes(prev => ({
      ...prev,
      [currentNoteKey]: e.target.value
    }));
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  if (!isMounted) return null; 

  return (
    <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-blue-500/20">
      <CalendarHeader 
        currentMonth={currentMonth} 
        nextMonth={nextMonth} 
        prevMonth={prevMonth} 
      />
      
      <div className="flex flex-col md:flex-row p-6 gap-8">
        <div className="w-full md:w-1/3 flex flex-col">
           {/* Show the user what they are currently writing notes for */}
           <div className="text-xs font-bold text-[#1da1f2] mb-2 uppercase tracking-wider">
             Notes for: {startDate ? format(startDate, 'MMM do, yyyy') : format(currentMonth, 'MMMM yyyy')}
           </div>
           <NotesSection notes={currentDisplayedNote} onChange={handleNotesChange} />
        </div>
        <div className="w-full md:w-2/3">
           <CalendarGrid 
              currentMonth={currentMonth}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
           />
        </div>
      </div>
    </div>
  );
}