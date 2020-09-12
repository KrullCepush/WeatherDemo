import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import GoogleMapReact from "google-map-react";

import * as routes from "@pages";

import "./styles/styles.scss";

function App() {
  return (
    <Switch>
      <Route {...routes.findGeo} />
      <Route {...routes.home} />
    </Switch>
  );
}

export default App;
