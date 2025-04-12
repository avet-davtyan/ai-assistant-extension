import axios from "./api/axiosInstance";
import { Button } from "antd";
import { ActionBaseRoute, ActionRoutes, ActionUnionSchema, joinURL } from "@ai-assistant/shared";
import { GeneratedActionHandler } from "./action-handler/action-handler";

const handleGeneratActionsRequest = async () => {
  const actions = await axios.post<ActionUnionSchema[]>(joinURL(ActionBaseRoute, ActionRoutes.generateActions), {});
  GeneratedActionHandler.getInstance().handleGeneratedActions(actions.data);
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
