import React, { useState } from "react";

const DateAndTimeModal = ({ onClose, onSetDateTime }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");

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
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isDateDisabled = (day) => {
    const dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
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

  const handleDateClick = (day) => {
    if (!isDateDisabled(day)) {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
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
      const today = new Date();
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          aria-label={`Day ${day}`}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium transition-all
            ${disabled ? "text-gray-500 cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-110"}
            ${selected ? "bg-white text-black scale-105 shadow" : "text-white"}
            ${isToday && !selected ? "ring-2 ring-inset ring-white/60" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const handleSetClick = () => {
    if (!selectedDate) {
      alert("Please select a date first!");
      return;
    }

    const fullDate = new Date(selectedDate);
    fullDate.setHours(parseInt(selectedHour));
    fullDate.setMinutes(parseInt(selectedMinute));

    onSetDateTime(fullDate);
  };


  const handleCancel = () => {
    setSelectedDate(null);
    setSelectedHour("12");
    setSelectedMinute("00");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
      <div className="w-full max-w-xs sm:max-w-sm bg-black rounded-2xl shadow-lg p-4 flex flex-col relative text-white">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={previousMonth}
            aria-label="Previous month"
            className="text-white bg-white/10 px-2 py-1 rounded-md text-sm"
          >
            «
          </button>

          <div className="text-center">
            <div className="text-sm text-white font-semibold">
              {monthNames[currentDate.getMonth()]}
            </div>
            <div className="text-xs text-gray-300">{currentDate.getFullYear()}</div>
          </div>

          <button
            onClick={nextMonth}
            aria-label="Next month"
            className="text-white bg-white/10 px-2 py-1 rounded-md text-sm"
          >
            »
          </button>
        </div>

       
        <div className="grid grid-cols-7 gap-1 mb-2 text-[10px] sm:text-xs text-gray-300">
          {dayNames.map((d, i) => (
            <div
              key={`${d}-${i}`}
              className="h-6 flex items-center justify-center font-semibold"
            >
              {d}
            </div>
          ))}
        </div>

        
        <div className="grid grid-cols-7 gap-1 place-items-center flex-1">
          {renderCalendarDays()}
        </div>

       
        <div className="mt-1 p-2 flex justify-center gap-3 items-center">

          <select
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            className="px-2 py-1 h-8 border border-gray-600 bg-black text-white rounded-md text-sm"
          >
            {hours.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <span className="text-white font-semibold text-lg">:</span>

          <select
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(e.target.value)}
            className="px-2 py-1 h-8 border border-gray-600 bg-black text-white rounded-md text-sm"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

        </div>


        
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm font-medium w-full sm:w-auto"
          >
            Cancel
          </button>

          <button
            onClick={handleSetClick}
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all text-sm font-semibold w-full sm:w-auto"
          >
            Set
          </button>
        </div>

      </div>
    </div>
  );

};

export default DateAndTimeModal;
