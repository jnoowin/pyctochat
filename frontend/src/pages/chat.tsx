import React from "react";
import Feed from "../components/Feed";
import Input from "../components/Input";

const Chat: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center">
      <section className="bg-gray-400 w-1/2 h-screen flex flex-col-reverse items-center">
        <Input />
        <Feed />
      </section>
    </div>
  );
};

export default Chat;
