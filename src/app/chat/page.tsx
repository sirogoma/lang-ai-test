"use client";
import { useChat, questionSet } from "../../hooks/useChat";
import { useEffect, useState } from "react";

export default function Page() {
  const { talkLogs, send } = useChat();
  const [questionText, setQuestionText] = useState("");
  const initState: questionSet[] = [];
  const [dispTalkLogs, setDispTalkLogs] = useState(initState);

  useEffect(() => {
    console.log("useEffect");
    setDispTalkLogs([...talkLogs]);
  }, [talkLogs]);

  return (
    <div className="m-4">
      <h1 className="font-extrabold text-xl">教えてAI21</h1>
      <hr className="border border-black" />
      <div>
        {dispTalkLogs.map((talk, index) => {
          return (
            <div key={index} className="mt-8">
              <li className="list-none font-bold">{talk.question}</li>
              <li className="list-none text-sm">＞ {talk.reply}</li>
            </div>
          );
        })}
      </div>
      <div className="mt-4 w-max">
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border border-slate-500 p-1 w-80"
        />
        <button
          onClick={() => send(questionText)}
          className="border border-slate-500 bg-slate-400 font-bold py-1 px-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
