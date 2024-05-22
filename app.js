import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Consultas from "./Consultas";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/consultas" component={Consultas} />
        {/* Adicione outras rotas aqui */}
      </Switch>
    </Router>
  );
};

export default App;
