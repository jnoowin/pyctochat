import React from "react";
import { Message } from "../types/chatlog";

interface MessageContainerProps {
  message: Message;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  message,
}: MessageContainerProps) => {
  return (
    <div>
      <label className={`nameplate bg-${message.color}-100`}>
        {message.user}
      </label>
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
