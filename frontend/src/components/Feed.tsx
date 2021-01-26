import React from "react";
import { useSelector } from "react-redux";
import { Chatlog } from "../redux/types";
import MessageContainer from "./MessageContainer";

const Feed: React.FC = () => {
  const chatlog = useSelector((state: Chatlog) => state.chatlog);
  return (
    <div className="flex flex-row w-full h-1/2">
      <div className="bg-white w-8 h-full"></div>
      <section
        className="flex flex-col-reverse w-full h-full overflow-y-scroll overflow-x-hidden"
        id="feed"
      >
        <div className="flex flex-col">
          {chatlog.map((message, index) => (
            <MessageContainer key={index} message={message} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Feed;
