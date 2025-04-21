import ElementHighlight from "./components/element-highlight/ElementHighlight";
import PromptBox from "./components/prompt-box/PromptBox";
import { useElementHighlightStore } from "./store/element-highlight-store";
import { usePromptBoxStore } from "./store/prompt-box-store";

const App = () => {

  const {
    visible: promptBoxVisible,
  } = usePromptBoxStore();

  const {
    visible: ElementHighlightVisible,
  } = useElementHighlightStore();

  return (
    <>
    {ElementHighlightVisible && <ElementHighlight />}
    {promptBoxVisible && <PromptBox />}
    </>
  );
};

export default App;