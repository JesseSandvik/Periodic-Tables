import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../reservations/NewTable";
import SeatReservation from "../reservations/SeatReservation";
import SearchPhone from "../reservations/SearchPhone";
import EditReservation from "../reservations/EditReservation";

function Routes() {

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/dashboard/:date">
        <Dashboard />
      </Route>
      <Route path="/search">
        <SearchPhone />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;