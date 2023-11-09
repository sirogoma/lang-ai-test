"use client";
import { useChat, questionSet } from "../../hooks/useChat";
import { useEffect, useState } from "react";

export default function Page() {
  const { talkLogs, send } = useChat();
  const [questionText, setQuestionText] = useState("");
  const initState: questionSet[] = [];
  const [dispTalkLogs, setDispTalkLogs] = useState(initState);

  useEffect(() => {
    setDispTalkLogs([...talkLogs]);
  });

  return (
    <>
      <h1>Chat</h1>
      <div>
        {dispTalkLogs.map((talk) => {
          return (
            <>
              <li>{talk.question}</li>
              <li>{talk.reply}</li>
            </>
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
