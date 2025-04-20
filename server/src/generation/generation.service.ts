import {
  GenerateActionsRequestBody,
  GeneratedActionsResponseSchema,
} from "@ai-assistant/shared";
import { OpenAiApiService } from "../open-ai/openai-api.service";
import {
  generateActionGenerationPromptAssistant,
  generateActionGenerationPromptUser,
} from "./propmts/action-generation.prompts";

export class GenerationService {

  public static instance: GenerationService;
  private readonly openAiApiService: OpenAiApiService;

  public constructor() {
    this.openAiApiService = OpenAiApiService.getInstance();
  }

  public static getInstance(): GenerationService {
    if (!GenerationService.instance) {
      GenerationService.instance = new GenerationService();
    }
    return GenerationService.instance;
  }

  public async generateActionGenerationResponse(
    options: GenerateActionsRequestBody,
  ): Promise<GeneratedActionsResponseSchema> {

    const {
      prompt,
      tabList,
      groupList,
    } = options;

    const userContent = generateActionGenerationPromptUser(prompt);
    const assistantContent = generateActionGenerationPromptAssistant({
      groupList,
      tabList,
    });

    const response = await this.openAiApiService.sendRequest({
      userContent,
      assistantContent,
    });

    const generatedActionsResponseSchema = await GeneratedActionsResponseSchema.parseAsync(response);

    return generatedActionsResponseSchema;
  }

}
