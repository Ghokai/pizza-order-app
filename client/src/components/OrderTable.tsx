import { Table, Tag } from "antd";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PizzaOrder } from "../models";

const { Column, ColumnGroup } = Table;

const getStatusTagColor = (statusId: number): string => {
  switch (statusId) {
    case 1:
      return "blue";
    case 2:
      return "yellow";
    case 3:
      return "red";
    case 4:
      return "green";
  }
  return "black";
};

interface OrderTableProps extends RouteComponentProps<any> {
  orders: PizzaOrder[];
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  history
}: OrderTableProps): React.ReactElement => {
  return (
    <Table dataSource={orders} rowKey="id">
      <Column title="Order Id" dataIndex="id" key="id" />
      <ColumnGroup title="Customer">
        <Column title="Name" dataIndex="customerName" key="customerName" />
        <Column
          title="Address"
          dataIndex="customerAddress"
          key="custormeAddress"
        />
      </ColumnGroup>
      <Column title="Order Date" dataIndex="orderDate" key="orderDate" />
      <Column title="Pizza Count" dataIndex="count" key="count" />
      <Column
        title="Pizza Type"
        dataIndex="pizzaType"
        key="pizzaType"
        render={pizzaType => (
          <span>
            <Tag color="blue">{pizzaType.type}</Tag>
          </span>
        )}
      />
      <Column
        title="Pizza Size"
        dataIndex="pizzaSize"
        key="pizzaSize"
        render={pizzaSize => (
          <span>
            <Tag color="blue">{pizzaSize.size}</Tag>
          </span>
        )}
      />
      <Column
        title="Order Status"
        dataIndex="orderStatus"
        key="orderStatus"
        render={orderStatus => (
          <span>
            <Tag color={getStatusTagColor(orderStatus.id)}>
              {orderStatus.status}
            </Tag>
          </span>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record: any) => (
          <span>
            <a onClick={() => history.push("/detail/" + record.id)}>
              <u>Details</u>
            </a>
          </span>
        )}
      />
    </Table>
  );
};

export default withRouter<OrderTableProps, any>(OrderTable);
