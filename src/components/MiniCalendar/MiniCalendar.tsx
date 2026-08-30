import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './MiniCalendar.css';

interface MiniCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  onDateSelect,
  selectedDate: propSelectedDate
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 30)); // Default to mock date August 30, 2026
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(propSelectedDate || new Date(2026, 7, 30));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Days in current month
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  // First day of current month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from propagating to bento card click
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop click from propagating to bento card click
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (e: React.MouseEvent, day: number) => {
    e.stopPropagation(); // Stop click from propagating to bento card click
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    if (onDateSelect) {
      onDateSelect(clickedDate);
    }
  };

  const isToday = (day: number) => {
    const today = new Date(2026, 7, 30); // Mock current day is August 30, 2026
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
  };

  // Generate days array
  const daysArray = [];
  // Empty slots for days before the 1st of the month
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(<div key={`empty-${i}`} className="mini-calendar__day mini-calendar__day--empty" />);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const classes = [
      'mini-calendar__day',
      isToday(day) ? 'mini-calendar__day--today' : '',
      isSelected(day) ? 'mini-calendar__day--selected' : ''
    ].filter(Boolean).join(' ');

    daysArray.push(
      <div
        key={`day-${day}`}
        className={classes}
        onClick={(e) => handleDayClick(e, day)}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="mini-calendar" onClick={(e) => e.stopPropagation()}>
      <div className="mini-calendar__header">
        <span className="mini-calendar__month">
          {monthNames[month]} {year}
        </span>
        <div className="mini-calendar__nav">
          <button className="mini-calendar__btn" onClick={prevMonth} type="button">
            <ChevronLeft size={12} />
          </button>
          <button className="mini-calendar__btn" onClick={nextMonth} type="button">
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
      <div className="mini-calendar__weekdays">
        {weekdays.map((day, idx) => (
          <div key={`weekday-${idx}`} className="mini-calendar__weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="mini-calendar__days">{daysArray}</div>
    </div>
  );
};
