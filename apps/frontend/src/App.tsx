import React from 'react';
import './App.css';
import './assets/styles/main.css'
import './assets/styles/responsive.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DefaultLayout from "./ui/DefaultLayout";
import Devices from "./ui/Devices";

function App() {
  return (
    <Router>
      <div className={"App"}>
          <DefaultLayout>
            <Switch>
              <Route path="/devices" component={Devices}/>
            </Switch>
          </DefaultLayout>
      </div>
    </Router>
  );
}

export default App;
