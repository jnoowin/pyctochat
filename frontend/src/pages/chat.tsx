import React, { useState } from "react";

const Chat: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <div className=" w-screen h-screen flex flex-col-reverse items-center">
      <input
        className="bg-gray-200 py-1 px-4 rounded-full w-1/2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </div>
  );
};

export default Chat;
