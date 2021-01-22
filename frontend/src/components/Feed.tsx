import React from "react";
import { useSelector } from "react-redux";
import { Message, Chatlog } from "../redux/types";
import MessageContainer from "./MessageContainer";

const Feed: React.FC = () => {
  const chatlog = useSelector((state: Chatlog) => state.chatlog);
  return (
    <div className="flex flex-col-reverse w-11/12 overflow-y-scroll h-full">
      <div className="flex flex-col">
        {chatlog.map((message, index) => (
          <MessageContainer key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
