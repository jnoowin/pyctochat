import React from "react";
import { useSelector } from "react-redux";
import MessageContainer from "./MessageContainer";
import { RootState } from "../types/interfaces";

const Feed: React.FC = () => {
  const chatlog = useSelector((state: RootState) => state.chatlog.chatlog);
  return (
    <section
      className="flex flex-col-reverse w-full h-full overflow-y-scroll overflow-x-hidden "
      id="feed"
    >
      {chatlog.length > 0 ? (
        chatlog.map((message) => (
          <div className="flex flex-row" key={message._id}>
            <div className="bg-white w-8 h-full"></div>
            <MessageContainer message={message} />
          </div>
        ))
      ) : (
        <div className="bg-white w-8 h-full"></div>
      )}
    </section>
  );
};

export default Feed;
