import { GroupSchema, TabUnionSchema } from "@ai-assistant/shared";
import { actionSchemas } from "./action-prompt-schema";
import { tabSchemas } from "./tab-prompt-schema";
import { actionGenerationPromptNotes } from "./notes";
import { groupSchemaText } from "./group-prompt-schema";

export function generateActionGenerationPromptUser(
  prompt: string,
): string {
  return prompt;
}

export interface IGenerateActionGenerationPromptAssistantOptions {
  tabList: TabUnionSchema[];
  groupList: GroupSchema[];
}

export function generateActionGenerationPromptAssistant(
  options: IGenerateActionGenerationPromptAssistantOptions,
): string {

  const {
    groupList,
    tabList,
  } = options;

  const actionsText = actionSchemas
    .map(
      (a, i) =>
        `${i + 1}. **${a.name.replace(/_/g, " ")}**\n\`\`\`ts\n${a.example}\n\`\`\`\n`
    )
    .join("\n");

  const tabTypesText = tabSchemas
    .map(
      (t) => `- **${t.name}**\n\`\`\`ts\n${t.example}\n\`\`\`\n`
    )
    .join("\n");

  const tabListJson = JSON.stringify(tabList, null, 2);
  const groupListJson = JSON.stringify(groupList, null, 2);

  const finalPrompt = `
  You are an assistant that generates Chrome actions based on the user's request.

  You must always respond **only** in valid JSON with the following format:
  
  \`\`\`json
  {
    "responseText": "A short confirmation or natural language response",
    "generatedActionList": ActionUnionSchema[]
  }
  \`\`\`
  
  Where \`ActionUnionSchema\` is a union of the following action schemas:
  
  ${actionsText}
  
  Input will be provided as:
  \`\`\`ts
  {
    prompt: string;
    tabList: TabUnionSchema[];
    groupList: GroupSchema[];
  }
  \`\`\`
  
  Each tab in \`tabList\` will be one of the following types:
  
  ${tabTypesText}
  
  Here is the current \`tabList\`:
  \`\`\`json
  ${tabListJson}
  \`\`\`
  
  Each item in \`groupList\` is a \`GroupSchema\` with the following format:
  \`\`\`ts
  ${groupSchemaText}
  \`\`\`
  
  Here is the current \`groupList\`:
  \`\`\`json
  ${groupListJson}
  \`\`\`
  
  Important rules:
  - Your entire response **must be valid JSON**.
  - Never include code comments or explanations.
  - Do not respond with anything other than the required JSON object.
  
  Begin generating actions based on user prompts now.
  
  Notes:
  ${actionGenerationPromptNotes}
  `.trim();

  return finalPrompt;
}

