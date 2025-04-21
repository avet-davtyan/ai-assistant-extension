import { usePromptBoxStore } from "./store/prompt-box-store";
import { Button } from "antd";

const App = () => {

  const {
    left,
    top,
    visible,
  } = usePromptBoxStore();

  return (
    <div
    id="annoying-div"
    >
      <Button style={{
        visibility: visible ? "visible" : "hidden",
        position: "fixed",
        left: left,
        top: top,
        zIndex: 1000
      }}>Annoying Button</Button>
    </div>
  );
};

export default App;