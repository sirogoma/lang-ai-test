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
    <>
      <h1>Chat</h1>
      <div>
        {dispTalkLogs.map((talk, index) => {
          return (
            <div key={index}>
              <li>質問：{talk.question}</li>
              <li>回答：{talk.reply}</li>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <button onClick={() => send(questionText)}>Send</button>
      </div>
    </>
  );
}
