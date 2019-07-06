import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzaOrders } from "../../store/actions/actions";
import OrderTable from "../OrderTable";
import { AppState } from "../../store/index";
import { Spin } from "antd";

const OrderList: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { hasError, isLoading, orders } = useSelector(
    (state: AppState) => state.PizzaOrders
  );

  useEffect(() => {
    dispatch(fetchPizzaOrders());
  }, []);
  if (isLoading) {
    return <Spin className="spinner" tip="Processing..."></Spin>;
  }
  return (
    <div>
      <h1>Pizza Orders</h1>
      <OrderTable orders={orders}></OrderTable>
    </div>
  );
};

export default OrderList;
