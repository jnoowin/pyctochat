import React, { useState } from "react";
import { nanoid } from "nanoid";
import ColorPicker from "../components/ColorPicker";
import { BsArrowClockwise } from "react-icons/bs";

const Landing: React.FC = () => {
  const [username, setUsername] = useState("");
  const [roomcode, setRoomcode] = useState(nanoid(8));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="w-screen h-screen bg-blue-200">
      <main className="h-screen w-screen md:w-96 bg-white shadow-xl items-center pt-6 px-8">
        <section className="w-full">
          <h2 className="text-3xl font-bold mb-12">Pyctochat</h2>

          <h1 className="text-4xl font-semibold mb-4">Create a room</h1>

          <label className="land-label" htmlFor="username">
            Username:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="land-input"
            id="username"
            type="text"
          ></input>

          <label className="land-label" htmlFor="code">
            Room-code:
          </label>
          <input
            value={roomcode}
            onChange={(e) => setRoomcode(e.target.value)}
            className="land-input"
            id="code"
            type="text"
            required
          ></input>
          <div className="flex flex-row items-center mb-6">
            <BsArrowClockwise
              className="transition duration-300 transform hover:rotate-180 cursor-pointer text-3xl mr-4"
              onClick={() => setRoomcode(nanoid(8))}
            />
            <p className="text-gray-600">Don't like your code? Enter one!</p>
          </div>

          <hr className="my-8"></hr>

          <h1 className="text-4xl font-semibold mb-4">Join a room</h1>

          <label className="land-label" htmlFor="code2">
            Room-code:
          </label>
          <input className="land-input" id="code2"></input>

          <hr className="my-8"></hr>

          <ColorPicker />
        </section>
      </main>
    </div>
  );
};

export default Landing;
