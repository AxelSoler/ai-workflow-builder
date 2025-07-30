"use client";

import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

type Props = {
  content: string;
};

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePrompt = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!prompt) return;
    setLoading(true);
    const data = {
      contents: prompt
    };
    try {
      const res = await axios.post("http://localhost:4000/api/prompt", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setText(res.data.text);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <div className="text-3xl mb-4">Testing AI Connection</div>
      <form
        className="flex flex-col w-3/5 mx-auto"
        onSubmit={(e) => handleGeneratePrompt(e)}
      >
        <textarea
          name="prompt"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border border-gray-300 rounded-md p-2 bg-gray-800 w-full h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 my-4 rounded text-xl"
        >
          Generate Promp
        </button>
        {loading && <div className="text-xl mt-4">Loading...</div>}
        {text && <MarkdownRenderer content={text} />}
      </form>
    </div>
  );
}
