import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { ChromePicker } from "react-color";
import { useWebSocketContext } from "../components/WebSocketProvider";
import { useCanvasContext } from "./CanvasProvider";
import Canvas from "./Canvas";

const Input = () => {
  const ws = useWebSocketContext();
  const canvasContext = useCanvasContext();

  const [color, setColor] = useState({ shade: "black", show: false });
  const [radius, setRadius] = useState({ length: 0, show: false });
  const [showCanvas, setShowCanvas] = useState(true);
  const [text, setText] = useState("");

  const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if ((showCanvas && canvasContext?.cleared) || (!showCanvas && !text))
      return;

    if (showCanvas) {
      ws?.handleSendMessage({
        user: "blarghnog",
        canvas: canvasContext?.canvasRef.current?.toDataURL(),
        date: new Date(),
      });
      canvasContext?.clearCanvas();
    } else {
      ws?.handleSendMessage({
        user: "blarghnog",
        text: text,
        date: new Date(),
      });
      setText("");
    }
  };

  return (
    <div className="w-full flex justify-center m-1">
      <div className="flex flex-col mr-1">
        <ChromePicker
          className={`absolute transform-gpu -translate-x-60 ${
            color.show ? "" : "hidden"
          }`}
          color={color.shade}
          onChange={() => setColor({ ...color, shade: color.shade })}
        />

        <button
          className="btn-input rounded-tr-md border-black border border-b-0"
          onClick={() => setColor({ ...color, show: !color.show })}
        >
          color
        </button>
        <input
          className={`absolute w-28 transform-gpu rotate-90 -translate-x-20 translate-y-40 ${
            radius.show ? "" : "hidden"
          }`}
          type="range"
          min="1"
          max="30"
          value={radius.length}
          onChange={(e) =>
            setRadius({ ...radius, length: Number(e.target.value) })
          }
        ></input>

        <button
          className="btn-input rounded-br-md border-black border"
          onClick={() => setRadius({ ...radius, show: !radius.show })}
        >
          radius
        </button>
      </div>

      <div className="flex flex-grow flex-col">
        <label className="nameplate">blarghnog</label>
        {showCanvas ? (
          <Canvas />
        ) : (
          <textarea
            className="canvas-area"
            style={{ textIndent: "6rem" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          >
            <br></br>
          </textarea>
        )}
      </div>

      <div className="flex flex-col ml-1">
        <button
          className="btn-input border-black border border-b-0 rounded-tl-md"
          onClick={handleSend}
        >
          send
        </button>
        <button
          className="btn-input border-black border border-b-0"
          onClick={() => canvasContext?.clearCanvas()}
        >
          clear
        </button>
        <button
          className="btn-input border-black border rounded-bl-md"
          onClick={() => setShowCanvas(!showCanvas)}
        >
          swap
        </button>
      </div>
    </div>
  );
};

export default Input;
