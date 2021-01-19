import React from "react";
import Chat from "./pages/Chat";
import Layout from "./components/Layout";
import WebSocketProvider from "./components/WebSocketProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
const App: React.FC = () => {
  const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" component={Chat} />
            </Switch>
          </Layout>
        </Router>
      </WebSocketProvider>
    </Provider>
  );
};

export default App;
