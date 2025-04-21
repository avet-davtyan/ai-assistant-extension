import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";

export function initializeReact() {
  const rootContainer = document.createElement("div");
  rootContainer.id = "content-react-extension-root";
  document.body.appendChild(rootContainer);

  const root = ReactDOM.createRoot(rootContainer);
  root.render(React.createElement(App));
}

