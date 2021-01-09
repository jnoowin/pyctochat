import React from "react";
import { Chatlog } from "../redux/types";

const Feed: React.FC<Chatlog> = ({ chatlog }: Chatlog) => {
  return (
    <div>
      {chatlog.map((message, index) => (
        <p key={index}>{message.text}</p>
      ))}
    </div>
  );
};

export default Feed;
