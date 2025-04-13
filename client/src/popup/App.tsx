import axios from "./api/axiosInstance";
import { Button } from "antd";
import { ActionBaseRoute, ActionRoutes, ActionUnionSchema, joinURL } from "@ai-assistant/shared";
import { GeneratedActionHandler } from "./action-handler/action-handler";
import { TabDataCollector } from "./tab-data-collection/tab-data-collector";
import { CollectTabMessageSchema } from "../schemas/content-message/collect-tab-data.schema";
import { ContentMessageType } from "../schemas/content-message/content-message-type.schema";

const handleGeneratActionsRequest = async () => {

  const tabDataCollector = TabDataCollector.getInstance();
  const results = await tabDataCollector.collectDataFromAllTabs();
  console.log({results});
  
}

const App = () => {
  return (
    <div>
      "AI Assistant"
      <Button onClick={handleGeneratActionsRequest}>Generate actions</Button>
    </div>
  );
};

export default App;
