import React from "react";
import Chat from "./pages/chat";
import Layout from "./components/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Chat} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
