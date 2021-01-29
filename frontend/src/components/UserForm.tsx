import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setRoom } from "../actions/user";
import { RootState } from "../types/interfaces";
import { BsArrowClockwise } from "react-icons/bs";
import { nanoid } from "nanoid";

interface UserFormProps {
  isCreate: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ isCreate }: UserFormProps) => {
  const username = useSelector((state: RootState) => state.user.username);
  const color = useSelector((state: RootState) => state.user.color);
  const room = useSelector((state: RootState) => state.user.room);
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username.length <= 0 || room.length < 8) return;
  };

  return (
    <>
      <h1 className="land-header">
        {isCreate ? "Create a room" : "Join a room"}
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="land-label" htmlFor="username">
          Username:
        </label>
        <input
          value={username}
          onChange={(e) => dispatch(setUser(e.target.value, "username"))}
          className="land-input"
          id="username"
          type="text"
          required
        ></input>
        <label className="land-label" htmlFor="code">
          Room code:
        </label>
        <input
          value={room}
          onChange={(e) => dispatch(setRoom(e.target.value))}
          className={`land-input ${room.length < 8 ? "border-red-400" : ""}`}
          id="code"
          type="text"
          required
        ></input>
        {room.length < 8 && (
          <p className="text-red-400 text-sm">
            Room code must be at least 8 characters long
          </p>
        )}
        {isCreate && (
          <div className="flex flex-row items-center mt-2">
            <BsArrowClockwise
              className="transition duration-300 transform hover:rotate-180 cursor-pointer text-3xl mr-4"
              onClick={() => dispatch(setRoom(nanoid(8)))}
            />
            <p className="text-gray-600">Don't like your code? Enter one!</p>
          </div>
        )}
        <button
          className={`w-full h-10 text-white bg-${color}-600 rounded disabled:opacity-40 my-4`}
          disabled={username.length <= 0 || room.length < 8}
        >
          {isCreate ? "Create room" : "Join room"}
        </button>
      </form>
    </>
  );
};

export default UserForm;
