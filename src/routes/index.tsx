import { Switch, Redirect, Route } from "react-router-dom";
import PageNotFound from "../pages/errors/PageNotFound";
import Login from "../pages/login";
import PersonsPage from "../pages/admin/persons/PersonsPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Queues from "../pages/admin/queues/QueuesPage";

import CounterPage from "../pages/staff/counter/CounterPage";
import TransactionPage from "../pages/staff/transaction/TransactionPage";
import Dashboard from "../pages/dashboard";
import AdminStaffPage from "../pages/admin/staffs/StaffPage";
import Pendings from "../pages/staff/counter/Pendings";

// import StaffPage from "../pages/staff";

const RoutesComponent = () => {
  return (
    <Switch>
      <PublicRoute restricted={true} exact path="/">
        <Redirect to="/login" />
      </PublicRoute>
      <PublicRoute path="/counter"  component={CounterPage} exact />
      <PublicRoute path="/pendings"  component={Pendings} exact />

      <PublicRoute path="/login" restricted={true} component={Login} exact />
      <PrivateRoute
        path="/dashboard"
        component={Dashboard}
        role={["ADMIN", "STAFF"]}
      />
      <PrivateRoute path="/queues" component={Queues} role={["ADMIN"]} />
      <PrivateRoute path="/persons" component={PersonsPage} role={["ADMIN"]} />
      <PrivateRoute
        path="/staffs"
        component={AdminStaffPage}
        role={["ADMIN"]}
      />

      <PrivateRoute path="/counter" component={CounterPage} role={["STAFF"]} />
      <PrivateRoute
        path="/transaction"
        component={TransactionPage}
        role={["STAFF"]}
      />

      <Route path="/404" component={PageNotFound} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default RoutesComponent;
