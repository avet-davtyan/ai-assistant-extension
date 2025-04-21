import PromptBox from "./components/prompt-box/PromptBox";
import { usePromptBoxStore } from "./store/prompt-box-store";

const App = () => {

  const {
    visible,
  } = usePromptBoxStore();

  return (
    <>
    {visible && <PromptBox />}
    </>
  );
};

export default App;