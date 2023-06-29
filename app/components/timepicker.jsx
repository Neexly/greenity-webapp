import React from "react";

const TimePicker = ({ selectedDate, onSelect, availableSlots }) => {
  const handleTimeSelect = (time) => {
    const selectedDateTime = new Date(selectedDate);
    const [hour, minute] = time.split(":");
    selectedDateTime.setHours(hour);
    selectedDateTime.setMinutes(minute);
    onSelect(selectedDateTime);
  };

  return (
    <div className="grid gap-4 grid-cols-3 grid-rows-11">
      {availableSlots.map((hour) => (
        <span
          key={hour}
          onClick={() => handleTimeSelect(hour)}
          className="items-center rounded-md bg-blue-50 px-2 py-1 text-2xl font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 cursor-pointer hover:bg-blue-100"
        >
          {hour}
        </span>
      ))}
    </div>
  );
};

export default TimePicker;
