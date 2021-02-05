import React from "react";
import { Message } from "../types/chatlog";
import { useSelector } from "react-redux";
import { RootState } from "../types/interfaces";

interface MessageContainerProps {
  message: Message;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  message,
}: MessageContainerProps) => {
  const username = useSelector((state: RootState) => state.user.username);
  const color = useSelector((state: RootState) => state.user.color);
  return (
    <div>
      <label className={`nameplate bg-${color}-100`}>{username}</label>
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
