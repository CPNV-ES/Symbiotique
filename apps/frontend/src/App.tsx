import React from 'react';
import './App.css';
import './assets/styles/main.css'
import './assets/styles/responsive.css'
import { Switch, Route, Redirect } from "react-router-dom";
import DefaultLayout from "./ui/DefaultLayout";

function App() {
  return (
    <div className={"App"}>
      <Switch>
        <DefaultLayout>
          <Route exact path="/dashboard" component={Home} />
          <Redirect from="*" to="/dashboard" />
        </DefaultLayout>
      </Switch>
    </div>
  );
}

export default App;
