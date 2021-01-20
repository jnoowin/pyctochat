import React from "react";
import { useSelector } from "react-redux";
import { Chatlog } from "../redux/types";

const Feed: React.FC = () => {
  const chatlog = useSelector((state: Chatlog) => state.chatlog);
  return (
    <div className="flex flex-col w-11/12">
      {chatlog.map((message, index) => (
        <div className={`bg-blue-${index}00 flex flex-row`} key={index}>
          <p className="flex flex-grow">
            <b>{message.user}</b>: {message.text}
          </p>
          <p>{message.date.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
