import React from "react";
import ReactDOM from "react-dom/client";
import App from "./popup/App";

const rootContainer = document.createElement("div");
rootContainer.id = "my-react-extension-root";
document.body.appendChild(rootContainer);

const root = ReactDOM.createRoot(rootContainer);
root.render(React.createElement(App));
