import React from "react";
import Chat from "./pages/Chat";
import Layout from "./components/Layout";
import WebSocketProvider from "./components/WebSocketProvider";
import CanvasProvider from "./components/CanvasProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
const App: React.FC = () => {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <WebSocketProvider>
              <CanvasProvider>
                <Route path="/" component={Chat} />
              </CanvasProvider>
            </WebSocketProvider>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
