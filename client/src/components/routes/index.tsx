import * as React from "react";
import { Switch, Route } from "react-router-dom";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import NotFound from "./NotFound";

const Routes: React.FC = (): React.ReactElement => {
  return (
    <Switch>
      <Route exact path="/" component={OrderList} />
      <Route exact path="/detail/:orderId" component={OrderDetail} />
      <Route exact path="/neworder" component={OrderDetail} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
