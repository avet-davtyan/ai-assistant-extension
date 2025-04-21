import { Button, Flex, Input } from "antd";
import { usePromptBoxStore } from "../../store/prompt-box-store";

const PromptBox = () => {

  const {
    left,
    top,
    hide,
  } = usePromptBoxStore();

  const handleClosePromptBox = () => {
    hide();
  }
  
  return (
    <div style={
      {
        position: "fixed",
        left: left,
        top: top,
        zIndex: 1000
      }
    }>
      <Flex vertical style={{
        gap: "10px",
        padding: "10px",
      }}>
        <Button type="primary" onClick={handleClosePromptBox}>Close Prompt Box</Button>
        <Input.TextArea />
      </Flex>
    </div>
  )
}

export default PromptBox;