import React from "react";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import Layout from "./components/Layout";
import WebSocketProvider from "./components/WebSocketProvider";
import CanvasProvider from "./components/CanvasProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducers/index";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Landing} />
            <WebSocketProvider>
              <CanvasProvider>
                <Route path="/chat" component={Chat} />
              </CanvasProvider>
            </WebSocketProvider>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
