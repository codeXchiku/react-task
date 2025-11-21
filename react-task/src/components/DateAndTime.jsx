import React, { useState, useRef } from "react";
import DateAndTimeModal from "./DateAndTimeModal";

const DateAndTime = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);

  const handleDateTimeSet = (dateTime) => {
    setSelectedDateTime(dateTime);
    // setIsModalOpen(false); 
    console.log("Selected Date & Time:", dateTime);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-4">
    <div className="w-full max-w-xs sm:max-w-sm">
      <label className="block mb-2 text-gray-700 font-semibold text-sm tracking-wide">
        Pick Date & Time:
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={
            selectedDateTime
              ? `${selectedDateTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })} ${selectedDateTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : ""
          }
          onClick={() => setIsModalOpen(true)}
          readOnly
          placeholder="Select date and time"
          className={`
            w-full px-3 py-2 rounded-lg bg-white border border-gray-300 
            shadow-sm cursor-pointer focus:outline-none focus:ring-2 
            focus:ring-purple-500 transition-all duration-200
            ${selectedDateTime ? "font-semibold text-black" : "text-gray-500"}
          `}
        />

        <div className="absolute inset-0 rounded-lg pointer-events-none shadow-inner"></div>
      </div>
    </div>

    {/* MODAL OVERLAY + CENTERED POPUP */}
    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
        <DateAndTimeModal
          onClose={handleClose}
          onSetDateTime={handleDateTimeSet}
        />
      </div>
    )}
  </div>
);

};

export default DateAndTime;
