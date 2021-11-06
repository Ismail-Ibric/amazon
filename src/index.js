import React from "react";
import ReactDOM from "react-dom";
import App from "./page/App";
import { StateProvider } from "./util/StateProvider";
import reducer, { initialState } from "./util/reducer";

const AppRef = React.forwardRef((props, ref) => (
  <App ref={ref} {...props} />
));

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppRef />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// window.updateTopMostParent = (someValue) => {
//   // Update state of topmost parent when this method is called 
//   AppRef.current.setState({ someStateVariable: someValue }); 
// };

// window.refreshTopMostParent = () => {
//   // Refresh state of topmost parent when this method is called
//   AppRef.current.forceUpdate(); 
// };