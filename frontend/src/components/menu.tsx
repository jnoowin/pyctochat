import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-green-900 h-screen w-52 flex flex-col items-center text-white p-2">
      <section className="flex space-x-10">
        <Link className="text-3xl" to="/">
          Home
        </Link>
        <span className="">🠔</span>
        <Link to=""></Link>
      </section>
    </div>
  );
};

export default Menu;
