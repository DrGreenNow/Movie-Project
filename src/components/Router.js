import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "../App";
import Film from "./Film";
import Favorites from "./Favorites";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/movie/:id" component={Film} />
      <Route path="/favorites" component={Favorites} />
    </Switch>
  </BrowserRouter>
);

export default Router;
