import React from "react";
import Landing from "./pages/Landing";
import Chat from "./pages/Chatroom";
import WebSocketProvider from "./components/WebSocketProvider";
import CanvasProvider from "./components/CanvasProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/index";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <WebSocketProvider>
            <CanvasProvider>
              <Route path="/room/:id" component={Chat} />
            </CanvasProvider>
          </WebSocketProvider>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
