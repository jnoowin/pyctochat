import React, { useRef, useEffect } from "react";
import { Message } from "../redux/types";

const CanvasMessage = ({ message }: any) => {
  return (
    <>
      {!message.text ? (
        <img className="canvas-area" src={message.canvas} alt="message"></img>
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

export default CanvasMessage;
