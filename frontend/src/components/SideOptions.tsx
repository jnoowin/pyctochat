import React from "react";
import { BsPencil } from "react-icons/bs";
import { BiEraser } from "react-icons/bi";

const SideOptions = () => {
  return (
    <div className="w-8 flex flex-col bg-white">
      <label className="side-label" htmlFor="up">
        <svg
          id="up"
          width="15"
          height="15"
          stroke="white"
          strokeWidth="2"
          fill="dimgray"
          onClick={() => console.log("poop")}
        >
          <polygon points="0,10 15,10 7.5,0"></polygon>
        </svg>
      </label>

      <label className="side-label mb-2" htmlFor="down">
        <svg
          id="down"
          width="15"
          height="15"
          stroke="white"
          strokeWidth="2"
          fill="dimgray"
          onClick={() => console.log("poop")}
        >
          <polygon points="7.5,13 15,3 0,3"></polygon>
        </svg>
      </label>

      <label className="side-label" htmlFor="size-small">
        <button
          className="rounded-full bg-gray-600 outline-none w-1.5 h-1.5"
          id="size-small"
          onClick={() => console.log("poop")}
        ></button>
      </label>

      <label className="side-label" htmlFor="size-big">
        <button
          className="rounded-full bg-gray-600 outline-none w-2.5 h-2.5"
          id="size-big"
          onClick={() => console.log("poop")}
        ></button>
      </label>

      <label className="side-label mb-2" htmlFor="pen">
        <span id="pen" onClick={() => console.log("poop")}>
          <BsPencil />
        </span>
      </label>
      <label className="side-label mb-2" onClick={() => console.log("poop")}>
        <span onClick={() => console.log("poop")}>
          <BiEraser />
        </span>
      </label>
    </div>
  );
};

export default SideOptions;
