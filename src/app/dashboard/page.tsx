"use client";

import { useState } from "react";
import { FaAnglesLeft } from "react-icons/fa6";



export default function Dashboard() {
  const [fullWidth, setFullWidth] = useState(true);

  return (
    <main className={`h-screen w-screen flex`}>
      <section
        style={{ width: fullWidth ? "200px" : "80px" }}
        className={`bg-purple-700 h-screen relative transition-all duration-300 ease-in-out`}
      >
        <div className="absolute -right-4 top-20 p-2 border bg-white shadow rounded-lg cursor-pointer" onClick={() => setFullWidth(!fullWidth)}>
          <FaAnglesLeft className={`${!fullWidth && 'scale-x-[-1]'} duration-300 transition-all ease-out`} />
        </div>
        Hello
      </section>
      <section className={`w-full`}>
        Huulaala
      </section>
    </main>
  );
}
