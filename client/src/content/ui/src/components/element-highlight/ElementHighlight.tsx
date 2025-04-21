import { Button, Flex, Input } from "antd";
import { useElementHighlightStore } from "../../store/element-highlight-store";

const ElementHighlight = () => {

  const {
    left,
    top,
    width,
    height,
  } = useElementHighlightStore();

  return (
    <div style={
      {
        pointerEvents: "none",
        position: "absolute",
        left: left,
        top: top,
        width: width,
        height: height,
        zIndex: 1000,
        backgroundColor: "green",
        opacity: 0.5,
      }
    }>
    </div>
  )
}

export default ElementHighlight;