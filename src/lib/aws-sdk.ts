import { config } from "aws-sdk";
import {
  BedrockRuntime,
  InvokeModelCommand,
  InvokeModelCommandInput,
} from "@aws-sdk/client-bedrock-runtime";

const aws_access_key_id = "HOGEFUGA";
const aws_secret_access_key = "HOGEFUGA";

export const getCredentials = async () => {
  console.log("hoge");

  await config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", config.credentials?.accessKeyId);
    }
  });
};

export const runAi21 = async (prompt: string): Promise<string> => {
  const client = new BedrockRuntime({
    region: "us-east-1",
    credentials: {
      accessKeyId: aws_access_key_id,
      secretAccessKey: aws_secret_access_key,
    },
  });

  const bodyJson = {
    prompt: prompt,
    maxTokens: 200,
    temperature: 0,
    topP: 250,
    stop_sequences: [],
    countPenalty: { scale: 0 },
    presencePenalty: { scale: 0 },
    frequencyPenalty: { scale: 0 },
  };

  //const bodyString =
  //('{"prompt":"this is where you place your input text","maxTokens":200,"temperature":0,"topP":250,"stop_sequences":[],"countPenalty":{"scale":0},"presencePenalty":{"scale":0},"frequencyPenalty":{"scale":0}}"');

  const bodyString = `{"prompt":"${prompt}","maxTokens":10}`;

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
