import React, { useState, useEffect } from "react";
import SideOptions from "./SideOptions";
import { useWebSocketContext } from "../components/WebSocketProvider";
import { useCanvasContext } from "./CanvasProvider";
import { SendButton, EraseButton, CopyButton } from "./SVG";
import Canvas from "./Canvas";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useSelector } from "react-redux";
import { RootState } from "../types/interfaces";
import { nanoid } from "nanoid";

const Input = () => {
  const ws = useWebSocketContext();
  const canvasContext = useCanvasContext();
  const [layout, setLayout] = useState("default");
  const username = useSelector((state: RootState) => state.user.username);
  const color = useSelector((state: RootState) => state.user.color);
  const chatlog = useSelector((state: RootState) => state.chatlog.chatlog);

  useEffect(() => {
    document.getElementById("feed")!.scroll(0, chatlog.length * 200);
  }, [chatlog.length]);

  const handleSend = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    e.preventDefault();
    if (canvasContext && canvasContext.cleared) return;

    if (ws && canvasContext && canvasContext.canvasRef.current) {
      ws.handleSendMessage({
        user: "blarghnog",
        canvas: canvasContext.canvasRef.current.toDataURL(),
        date: new Date(),
        id: nanoid(),
      });
      canvasContext.clearCanvas();
    }
  };

  const handleKeyboard = (key: string) => {
    console.log(key);
    if (key === "{shift}" || key === "{lock}") {
      setLayout(layout === "default" ? "shift" : "default");
      return;
    }
    if (canvasContext) {
      if (key === "{bksp}") canvasContext.handleTyping({ key: "Backspace" });
      else if (key === "{space}") canvasContext.handleTyping({ key: " " });
      else canvasContext.handleTyping({ key: key });
    }
  };

  return (
    <div className="flex flex-row self-start">
      <SideOptions />
      <div className="flex flex-col h-full">
        <section className="h-full">
          <div className="h-8 w-full bg-white"></div>
          <label
            className={`absolute h-7 w-28 truncate bg-${color}-100 rounded-tl-md rounded-br-md m-2`}
          >
            {username}
          </label>
          <Canvas />
        </section>
        <section className="flex flex-row max-h-1/2">
          <div className="keyboard-bg keyboard-btn w-full flex flex-shrink m-2 mt-0">
            <Keyboard onKeyPress={handleKeyboard} layoutName={layout} />
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
