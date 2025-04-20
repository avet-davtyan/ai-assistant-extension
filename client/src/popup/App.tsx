import axios from "./api/axiosInstance";
import { Button, Flex, Input } from "antd";
import { ActionBaseRoute, ActionRoutes, GenerateActionsRequestBody, GeneratedActionsResponseSchema, joinURL } from "@ai-assistant/shared";
import { GeneratedActionHandler } from "./action-handler/action-handler";
import { TabDataCollector } from "./tab-data-collection/tab-data-collector";
import { useState } from "react";


const App = () => {

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  }

  const handleGeneratActionsRequest = async () => {

    setLoading(true);

    const tabDataCollector = TabDataCollector.getInstance();
    const actionHandler = GeneratedActionHandler.getInstance();

    const tabList = await tabDataCollector.collectDataFromAllTabs();


    const generateActionsBody: GenerateActionsRequestBody = {
      prompt,
      tabList,
      groupList: [],
    }
    
    const generatedActionsResponseSchema =
      await axios.post<GeneratedActionsResponseSchema[]>(
        joinURL(ActionBaseRoute, ActionRoutes.generateActions),
        generateActionsBody,
      );
  
    actionHandler.handleGeneratedActions(generatedActionsResponseSchema.data);

    setLoading(false);
    
  }
  return (
    <>
    {loading && <div>Loading...</div>}
      <Flex>
        <Input placeholder="Enter prompt" value={prompt} onChange={onInputChange} ></Input>
        <Button type="primary" onClick={handleGeneratActionsRequest}>Generate actions</Button>
      </Flex>
    </>
  );
};

export default App;
