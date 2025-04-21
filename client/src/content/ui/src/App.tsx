import { Button } from "antd";

const App = () => {

  return (
    <div
    id="annoying-div"
    >
      <Button style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        zIndex: 1000
      }}>Annoying Button</Button>
    </div>
  );
};

export default App;