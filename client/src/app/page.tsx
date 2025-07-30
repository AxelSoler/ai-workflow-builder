"use client";

import axios from "axios";

export default function Home() {
  const handleGeneratePrompt = async () => {
    const data = {
      contents: "Explain how AI works in less than 100 words"
    };
    const res = await axios.post("http://localhost:4000/api/prompt", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(res.data);
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>Hello World!</div>
      <button onClick={handleGeneratePrompt}>Generate Promp</button>
    </div>
  );
}
