import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ConsultasPage from "./pages/ConsultasPage";
import PacientesPage from "./pages/PacientesPage";
import EspecialistasPage from "./pages/EspecialistasPage";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/consultas">Consultas</Link>
          </li>
          <li>
            <Link to="/pacientes">Pacientes</Link>
          </li>
          <li>
            <Link to="/especialistas">Especialistas</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/consultas" component={ConsultasPage} />
        <Route path="/pacientes" component={PacientesPage} />
        <Route path="/especialistas" component={EspecialistasPage} />
      </Switch>
    </Router>
  );
}

export default App;
