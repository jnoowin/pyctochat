import React from "react";
import { BsPencil } from "react-icons/bs";
import { BiEraser } from "react-icons/bi";
import { useCanvasContext } from "./CanvasProvider";

const SideOptions = () => {
  const canvasContext = useCanvasContext();
  return (
    <div className="w-8 flex flex-col bg-white">
      <label
        className="side-label"
        htmlFor="up"
        onClick={() => {
          document
            .getElementById("feed")!
            .scrollBy({ top: -250, left: 0, behavior: "smooth" });
        }}
      >
        <svg
          id="up"
          width="15"
          height="15"
          stroke="white"
          strokeWidth="2"
          fill="dimgray"
        >
          <polygon points="0,10 15,10 7.5,0"></polygon>
        </svg>
      </label>

      <label
        className="side-label mb-2"
        htmlFor="down"
        onClick={() => {
          document
            .getElementById("feed")!
            .scrollBy({ top: 250, left: 0, behavior: "smooth" });
        }}
      >
        <svg
          id="down"
          width="15"
          height="15"
          stroke="white"
          strokeWidth="2"
          fill="dimgray"
        >
          <polygon points="7.5,13 15,3 0,3"></polygon>
        </svg>
      </label>

      <label className="side-label" htmlFor="size-small">
        <button
          className="rounded-full bg-gray-600 outline-none w-1.5 h-1.5"
          id="size-small"
          onClick={() => (canvasContext!.contextRef.current!.lineWidth = 2)}
        ></button>
      </label>

      <label className="side-label" htmlFor="size-big">
        <button
          className="rounded-full bg-gray-600 outline-none w-2.5 h-2.5"
          id="size-big"
          onClick={() => (canvasContext!.contextRef.current!.lineWidth = 5)}
        ></button>
      </label>

      <label
        className="side-label mb-2"
        htmlFor="pen"
        onClick={() =>
          (canvasContext!.contextRef.current!.strokeStyle = "black")
        }
      >
        <span id="pen">
          <BsPencil />
        </span>
      </label>
      <label
        className="side-label mb-2"
        htmlFor="eraser"
        onClick={() =>
          (canvasContext!.contextRef.current!.strokeStyle = "white")
        }
      >
        <span id="eraser">
          <BiEraser />
        </span>
      </label>
    </div>
  );
};

export default SideOptions;
