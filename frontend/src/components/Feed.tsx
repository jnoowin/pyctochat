import React from "react";
import { Chatlog } from "../redux/types";

const Feed: React.FC<Chatlog> = ({ chatlog }: Chatlog) => {
  return (
    <>
      {chatlog.map((message, index) => (
        <div className={`bg-blue-${index}00 flex flex-row w-11/12`} key={index}>
          <p className="flex flex-grow">
            <b>{message.user}</b>: {message.text}
          </p>
          <p>{message.date.toLocaleString()}</p>
        </div>
      ))}
    </>
  );
};

export default Feed;
