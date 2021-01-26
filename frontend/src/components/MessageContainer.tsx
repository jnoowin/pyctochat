import React from "react";
import { Message } from "../redux/types";

interface MCProps {
  message: Message;
}

const MessageContainer: React.FC<MCProps> = ({ message }: MCProps) => {
  return (
    <div>
      <label className="nameplate">blarghnog</label>
      <img
        className="canvas-area mt-0 pointer-events-none"
        src={message.canvas}
        alt="message"
        draggable="false"
      ></img>
    </div>
  );
};

export default MessageContainer;
