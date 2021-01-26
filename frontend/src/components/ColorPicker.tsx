import React, { useState } from "react";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("");

  const handleClickColor = (e: any) => {
    setColor(e.target.id);
  };

  return (
    <>
      <label className="land-label" htmlFor="color">
        Pick your favorite color!
      </label>
      <div className="flex justify-evenly mt-4" id="color">
        <button
          className={`land-color bg-red-400 ${
            color === "red" ? "ring-4 ring-offset-2 ring-red-200" : ""
          }`}
          id="red"
          onClick={handleClickColor}
        ></button>
        <button
          className={`land-color bg-yellow-400 ${
            color === "yellow" ? "ring-4 ring-offset-2 ring-yellow-200" : ""
          }`}
          id="yellow"
          onClick={handleClickColor}
        ></button>
        <button
          className={`land-color bg-green-400 ${
            color === "green" ? "ring-4 ring-offset-2 ring-green-200" : ""
          }`}
          id="green"
          onClick={handleClickColor}
        ></button>
        <button
          className={`land-color bg-blue-400 ${
            color === "blue" ? "ring-4 ring-offset-2 ring-blue-200" : ""
          }`}
          id="blue"
          onClick={handleClickColor}
        ></button>
        <button
          className={`land-color bg-purple-400 ${
            color === "purple" ? "ring-4 ring-offset-2 ring-purple-200" : ""
          }`}
          id="purple"
          onClick={handleClickColor}
        ></button>
        <button
          className={`land-color bg-pink-400 ${
            color === "pink" ? "ring-4 ring-offset-2 ring-pink-200" : ""
          }`}
          id="pink"
          onClick={handleClickColor}
        ></button>
      </div>
    </>
  );
};

export default ColorPicker;
