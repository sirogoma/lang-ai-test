import { useState } from "react";
import { runAi21 } from "../lib/aws-sdk";

// 発言セット
export type questionSet = {
  question: string | null;
  reply: string | null;
};

export const useChat = () => {
  const initState: questionSet[] = [];
  const [talkLogs, setTalkLogs] = useState(initState);

  const send = async (question: string) => {
    const result = await runAi21(question);

    const set: questionSet = { question: question, reply: result };

    // talkLogsのコピーを作成し、新しい発言を追加
    const updatedTalkLogs = [...talkLogs, set];
    setTalkLogs(updatedTalkLogs);
  };

  return { talkLogs, setTalkLogs, send };
};
