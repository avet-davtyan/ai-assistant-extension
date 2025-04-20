import OpenAI from "openai";
import ENV from "../env";
import { IOpenAiSendRequestOptions } from "./types";

export class OpenAiApiService {

  public static instance: OpenAiApiService;
  private readonly client: OpenAI;

  public constructor() {
    this.client = new OpenAI(
      {
        apiKey: ENV.OPENAI_API_KEY,
      }
    )
  }

  public static getInstance(): OpenAiApiService {
    if (!OpenAiApiService.instance) {
      OpenAiApiService.instance = new OpenAiApiService();
    }
    return OpenAiApiService.instance;
  }

  public async sendRequest<T>(
    options: IOpenAiSendRequestOptions,
  ): Promise<T> {

    const {
      userContent,
      assistantContent,
    } = options;

    const completion = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: userContent,
        },
        {
          role: "assistant",
          content: assistantContent,
        }
      ]
    });

    const messageContent = completion.choices[0].message.content;

    if (messageContent === null) {
      throw new Error("Empty message content");
    }

    console.log("messageContent", {messageContent});

    const response = JSON.parse(messageContent) as T;

    return response;

  }
}
