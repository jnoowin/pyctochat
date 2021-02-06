import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRoom } from "../actions/user";
import { RootState } from "../types/interfaces";
import ColorPicker from "../components/ColorPicker";
import UserForm from "../components/UserForm";
import { nanoid } from "nanoid";

const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const color = useSelector((state: RootState) => state.user.color);
  const [isCreate, setIsCreate] = useState(true);

  const handleSwap = () => {
    setIsCreate(!isCreate);
    dispatch(setRoom(nanoid(8)));
  };

  return (
    <div className={`w-screen min-h-screen flex bg-${color}-200`}>
      <main className="w-full min-h-screen md:w-96 md:shadow-2xl bg-white items-center pt-6 px-8">
        <h2 className="text-3xl font-bold mb-12">Pyctochat</h2>
        <UserForm isCreate={isCreate} />

        <button className="text-blue-500" onClick={handleSwap}>
          {isCreate ? "or join a room." : "or create a room."}
        </button>
        <hr className="my-8"></hr>

        <ColorPicker />
      </main>
    </div>
  );
};

export default Landing;
