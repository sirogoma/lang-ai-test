import { getCredentials, runAi21 } from "../aws-sdk";
import { describe, expect, test } from "@jest/globals";

describe("aaaaa", () => {
  it("AI21", async () => {
    const result = await runAi21("日本で一番高い山の名前を教えて");

    console.log("回答:" + result);
    expect(result).not.toBeNull();
  });

  it("AWS", () => {
    getCredentials();
  });

  //   it("aaa", () => {
  //     const hoge = "hoge";
  //     expect(hoge).toBe("hoge");
  //   });

  //   it("adds 1 + 2 to equal 3", () => {
  //     expect(sum(1, 2)).toBe(3);
  //   });
});

function sum(a: any, b: any) {
  return a + b;
}
