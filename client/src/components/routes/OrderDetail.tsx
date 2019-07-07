import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "../../store/actions/actions";
import { DETAIL_CLEAR_ACTION } from "../../store/actions/actionTypes";
import { AppState } from "../../store";
import OrderForm from "../OrderForm";
import { Result, Spin, Button } from "antd";

const OrderDetail: React.FC = (props: any): React.ReactElement => {
  const dispatch = useDispatch();
  const { hasError, isLoading, detail } = useSelector(
    (state: AppState) => state.OrderDetail
  );

  useEffect(() => {
    if (props.match.params.orderId) {
      dispatch(fetchOrderDetail(props.match.params.orderId as number));
    } else {
      dispatch({ type: DETAIL_CLEAR_ACTION });
    }
  }, [props.match.params.orderId]);

  if (isLoading) {
    return <Spin className="spinner" tip="Processing..."></Spin>;
  }
  if (hasError) {
    return (
      <Result
        status="error"
        title="Server Error"
        subTitle="Order details can not found!"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              props.history.push("/");
            }}
          >
            Go to Order List
          </Button>
        ]}
      ></Result>
    );
  }
  return (
    <div>
      <h1>{props.match.params.orderId ? `Order Details for Order Id: ${props.match.params.orderId}`:`New Order Form:`}</h1>
      <OrderForm
        onBack={() => props.history.push("/")}
        orderInfo={detail}
      ></OrderForm>
    </div>
  );
};

export default OrderDetail;
