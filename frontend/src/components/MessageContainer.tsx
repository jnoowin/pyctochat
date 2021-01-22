import React, { useRef, useEffect } from "react";
import { Message } from "../redux/types";

interface MCProps {
  message: Message;
}

const MessageContainer: React.FC<MCProps> = ({ message }: MCProps) => {
  return (
    <>
      {message.canvas ? (
        <div>
          <label className="nameplate">blarghnog</label>
          <img
            className="canvas-area message-img"
            src={message.canvas}
            alt="message"
            draggable="false"
          ></img>
        </div>
      ) : (
        <div className="canvas-area flex flex-row">
          <p className="flex flex-grow">
            <b>{message.user}</b>: {message.text}
          </p>
          <p>{message.date.toLocaleString()}</p>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
