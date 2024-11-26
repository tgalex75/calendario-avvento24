// Casella.js
import React from "react";

function Casella({ id, day, isOpen, handleOpen }) {
  const myDate = new Date();
  const today = myDate.getUTCDate();
  //const today = 4

  const imgUrl = `./img/img_${day}.jpg`;

  return (
    <div
      className={`transition-all hover:border-solid hover:border-orange-400 duration-700 border-dotted border-2 md:border-4 font-bold text-4xl border-orange-400 flex items-center justify-center text-gray-200 rounded-md ${
        isOpen
          ? "bg-center bg-cover text-gray-700"
          : "even:bg-rose-900 odd:bg-teal-950"
      } cursor-pointer ${today < day && "pointer-events-none"}`}
      onClick={() => handleOpen(id)}
      style={isOpen ? { backgroundImage: `url(${imgUrl}` }: null}
    >
      <strong className={`${isOpen && "invisible"} text-4xl md:text-6xl`}>{day}</strong>
    </div>
  );
}

export default Casella;
