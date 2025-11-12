import React, { useState } from 'react';

export default function CompactDateAndTime() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const dayNames = ['S','M','T','W','T','F','S'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isDateDisabled = (day) => {
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0,0,0,0);
    return dateToCheck < today;
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleDateClick = (day) => {
    if (!isDateDisabled(day)) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newDate);
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const disabled = isDateDisabled(day);
      const selected = isDateSelected(day);
      const today = isToday(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          aria-label={`Day ${day}`}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium transition-all
            ${disabled ? 'text-purple-200 cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-110'}
            ${selected ? 'bg-purple-600 text-white scale-105 shadow' : ''}
            ${today && !selected ? 'ring-2 ring-inset ring-white/60' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    // Container sized to be a bit taller than wide (portrait)
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-64 h-[360px]">
        <div className="bg-purple-500 rounded-2xl shadow-lg p-4 h-full flex flex-col">

          {/* Header (compact) */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={previousMonth}
              aria-label="Previous month"
              className="text-white bg-white/10 px-2 py-1 rounded-md text-sm"
            >
              {/* Using text arrow because you mentioned angle brackets are not visible */}
              «
            </button>

            <div className="text-center">
              <div className="text-sm text-white/90 font-semibold">
                {monthNames[currentDate.getMonth()]}
              </div>
              <div className="text-xs text-white/80">{currentDate.getFullYear()}</div>
            </div>

            <button
              onClick={nextMonth}
              aria-label="Next month"
              className="text-white bg-white/10 px-2 py-1 rounded-md text-sm"
            >
              »
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-white/90">
            {dayNames.map((d) => (
              <div key={d} className="h-6 flex items-center justify-center font-semibold">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 place-items-center flex-1">
            {renderCalendarDays()}
          </div>

          {/* Selected date */}
          {selectedDate ? (
            <div className="mt-3 bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500">Selected</div>
              <div className="text-sm font-semibold text-purple-600">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          ) : (
            <div className="mt-3 bg-white/10 rounded-lg p-2 text-center text-xs text-white/70">No date selected</div>
          )}
        </div>
      </div>
    </div>
  );
}
