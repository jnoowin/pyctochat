import React from "react";
import Feed from "../components/Feed";
import Input from "../components/Input";
import { useSelector } from "react-redux";
import { RootState } from "../types/interfaces";

const Chat: React.FC = () => {
  const color = useSelector((state: RootState) => state.user.color);
  return (
    <div
      className={`w-screen h-screen bg-${color}-100 flex justify-center overflow-x-hidden`}
    >
      <main className="bg-gray-400 h-screen flex flex-col-reverse items-center">
        <Input />
        <Feed />
      </main>
    </div>
  );
};

export default Chat;
