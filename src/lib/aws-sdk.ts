import { config } from "aws-sdk";
import {
  BedrockRuntime,
  InvokeModelCommand,
  InvokeModelCommandInput,
} from "@aws-sdk/client-bedrock-runtime";

const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID as string;
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY as string;

export const runAi21 = async (prompt: string): Promise<string> => {
  const client = new BedrockRuntime({
    region: "us-east-1",
    credentials: {
      accessKeyId: aws_access_key_id,
      secretAccessKey: aws_secret_access_key,
    },
  });

  // const bodyJson = {
  //   prompt: prompt,
  //   maxTokens: 200,
  //   temperature: 0,
  //   topP: 250,
  //   stop_sequences: [],
  //   countPenalty: { scale: 0 },
  //   presencePenalty: { scale: 0 },
  //   frequencyPenalty: { scale: 0 },
  // };

  const bodyJson = {
    prompt: prompt,
    maxTokens: 20,
  };

  const bodyString = JSON.stringify(bodyJson);

  const params: InvokeModelCommandInput = {
    modelId: "ai21.j2-mid-v1",
    contentType: "application/json",
    accept: "*/*",
    body: bodyString,
  };

  const command = new InvokeModelCommand(params);

  let result: string = "";

  try {
    await client // 本当に叩くとお金がかかるので、JSONの型がわかったので答えを抜くだけにする
      .send(command)
      .then((data) => {
        console.log(data.body);
        const resultString = data.body.transformToString();
        const resultJson = JSON.parse(resultString);
        result = resultJson.completions[0].data.text;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }

  return result;
};
