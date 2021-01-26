import React, { useState } from "react";
import SideOptions from "./SideOptions";
import { useWebSocketContext } from "../components/WebSocketProvider";
import { useCanvasContext } from "./CanvasProvider";
import { SendButton, EraseButton, CopyButton } from "./SVG";
import Canvas from "./Canvas";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const Input = () => {
  const ws = useWebSocketContext();
  const canvasContext = useCanvasContext();

  const handleSend = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    e.preventDefault();
    if (canvasContext && canvasContext.cleared) return;

    if (ws && canvasContext) {
      ws.handleSendMessage({
        user: "blarghnog",
        canvas: canvasContext.canvasRef.current?.toDataURL(),
        date: new Date(),
      });
      canvasContext.clearCanvas();
    }
  };

  return (
    <div className="flex flex-row self-start">
      <SideOptions />
      <div className="flex flex-col h-full">
        <section className="h-full">
          <div className="h-8 w-full bg-white"></div>
          <label className="absolute h-7 w-28 truncate bg-blue-100 rounded-tl-md rounded-br-md m-2">
            Player 1
          </label>
          <Canvas />
        </section>
        <section className="flex flex-row max-h-1/2">
          <div className="keyboard-bg keyboard-btn w-full flex flex-shrink m-2 mt-0">
            <Keyboard />
          </div>
          <div className="flex flex-col flex-shrink flex-grow mb-2">
            <SendButton handleSend={handleSend} />
            <CopyButton />
            <EraseButton handleClear={canvasContext!.clearCanvas} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Input;
