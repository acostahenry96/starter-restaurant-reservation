import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";

import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservations from "./nested-routes/NewReservation";
import NewTables from "./nested-routes/NewTables";
import Seating from "./nested-routes/Seating";
import Search from  "./nested-routes/Search";
import Edit from "./nested-routes/Edit";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */

//here is where i need to define the routes

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact={true} path="/search">
        <Search />
      </Route>
      <Route exact={true} path="/reservations/new">
        <NewReservations />
      </Route>
      <Route exact={true} path="/tables/new">
        <NewTables />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seating />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <Edit />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
