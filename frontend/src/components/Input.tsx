import React, { useState } from "react";
import SideOptions from "./SideOptions";
import { useWebSocketContext } from "../components/WebSocketProvider";
import { useCanvasContext } from "./CanvasProvider";
import { SendButton, EraseButton, SwapButton } from "./SVG";
import Canvas from "./Canvas";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const Input = () => {
  const ws = useWebSocketContext();
  const canvasContext = useCanvasContext();

  const [color, setColor] = useState({ shade: "black", show: false });
  const [radius, setRadius] = useState({ length: 0, show: false });
  const [showCanvas, setShowCanvas] = useState(true);
  const [text, setText] = useState("");

  const handleSend = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
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

  const handleSwap = () => {
    setShowCanvas(!showCanvas);
  };

  return (
    <div className="flex flex-row w-full">
      <SideOptions />
      <div className="flex flex-grow flex-col">
        <div className="w-full">
          <div className="h-7 bg-white"></div>
          <label
            className="absolute block h-7 truncate text-center bg-blue-100 rounded-tl-md rounded-br-md border border-black m-2"
            style={{ maxWidth: "6rem" }}
          >
            Player 1
          </label>
          {/* {showCanvas ? ( */}
          <Canvas />
          {/* ) : ( */}
          {/* <textarea
              className="canvas-area"
              style={{ textIndent: "6rem" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            >
              <br></br>
            </textarea>
          )} */}
        </div>
        <section className="flex flex-row">
          <div className="keyboard-bg keyboard-btn w-full flex flex-shrink m-2">
            <Keyboard />
          </div>
          <div className="flex flex-shrink flex-col my-2">
            <SendButton handleSend={handleSend} />
            <EraseButton handleClear={canvasContext!.clearCanvas} />
            <SwapButton showCanvas={showCanvas} handleSwap={handleSwap} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Input;
