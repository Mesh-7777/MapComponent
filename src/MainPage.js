import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ReactDOM from "react-dom";
import Demographics from "./components/demographics";

export default function MainPage() {

	

	
  return (
    <div className="MainPage" style={{ marginTop: "130px" }}>
      <Router>
        <Switch>
          <Route
            exact
            path="/Demographics/:lev1/:lev2/:currentvariable/:currentstate/:currentYear"
          >
            <Demographics />
          </Route>

          <Route exact path="/">
            {/* <Redirect to = "/Categories"></Redirect> */}

            <Redirect to="/Demographics/Schemes/MNREGA/Total households allotted work/All India/2012" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
