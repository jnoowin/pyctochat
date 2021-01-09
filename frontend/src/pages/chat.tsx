import React, { useState } from "react";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/action";
import { Chatlog } from "../redux/types";

const Chat: React.FC = () => {
  const chatlog = useSelector((state: Chatlog) => state.chatlog);
  console.log(chatlog);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    dispatch(sendMessage({ user: "blarghnog", text: input, date: new Date() }));
    setInput("");
  };

  return (
    <div className=" w-screen h-screen flex flex-col-reverse items-center">
      <form className="w-1/2 mb-8" onSubmit={handleSubmit}>
        <input
          className="w-full bg-gray-200 py-1 px-4 rounded-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <Feed chatlog={chatlog} />
    </div>
  );
};

export default Chat;
