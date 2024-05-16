import React from "react";

export default function Navbar() {
  return (
    <nav className=" bg-slate-300 flex justify-between p-5 ">
      <ul className=" flex gap-3">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
      <div>
        <button>Log-Out</button>
      </div>
    </nav>
  );
}
