import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store/index";
import { Form, Input, Tag, Spin, Button, Select, InputNumber } from "antd";
import { PizzaOrder } from "../models";
import { FormComponentProps } from "antd/lib/form/Form";
import { createorUpdateOrder, deleteOrder } from "../store/actions/actions";

interface OrderFormProps extends FormComponentProps {
  orderInfo?: PizzaOrder;
  onBack: () => {};
}

interface orderFormData {
  id: number;
  count: number;
  orderDate: Date;
  customerName: string;
  customerAddress: string;
  orderStatus: number;
  pizzaType: number;
  pizzaSize: number;
}

const initialFormData: orderFormData = {
  id: 0,
  count: 0,
  orderDate: new Date(),
  customerName: "",
  customerAddress: "",
  orderStatus: 1,
  pizzaType: null,
  pizzaSize: null
};

const OrderForm: React.FC<OrderFormProps> = (
  props: OrderFormProps
): React.ReactElement => {
  const dispatch = useDispatch();
  const { pizzaSizes, pizzaTypes, orderStatuses, isLoading } = useSelector(
    (state: AppState) => ({
      pizzaSizes: state.FormFields.pizzaSizes,
      pizzaTypes: state.FormFields.pizzaTypes,
      orderStatuses: state.FormFields.orderStatuses,
      isLoading: state.PizzaOrders.isLoading
    })
  );
  const [formData, setFormData] = useState(initialFormData);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (props.orderInfo) {
      setFormData({
        ...props.orderInfo,
        orderStatus: props.orderInfo.orderStatus.id,
        pizzaType: props.orderInfo.pizzaType.id,
        pizzaSize: props.orderInfo.pizzaSize.id
      });

      if (props.orderInfo.orderStatus.id === 4) {
        setIsCompleted(true);
      }
    } else {
      setFormData(initialFormData);
      setIsCompleted(false);
    }
  }, [props.orderInfo]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        if (formData.id > 0) {
          values.id = formData.id;
        }
        await dispatch(createorUpdateOrder(values));
        props.onBack();
      }
    });
  };

  const onDeleteOrder = async () => {
    await dispatch(deleteOrder(formData.id));
    props.onBack();
  };

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };
  const { Option } = Select;
  return (
    <div>
      {isLoading && <Spin className="spinner" tip="Processing..."></Spin>}
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Order Id">
          <span className="ant-form-text">
            <Tag color="green">{formData.id > 0 ? formData.id : "-"}</Tag>
          </span>
        </Form.Item>

        <Form.Item label="Order Date">
          <span className="ant-form-text">
            <Tag color="green">
              {formData.id > 0 ? formData.orderDate.toLocaleString() : "-"}
            </Tag>
          </span>
        </Form.Item>

        <Form.Item label="Customer Name">
          {getFieldDecorator("customerName", {
            initialValue: formData.customerName,
            rules: [
              {
                required: true,
                message: "Please input customer name"
              }
            ]
          })(<Input disabled={isCompleted} />)}
        </Form.Item>
        <Form.Item label="Customer Address">
          {getFieldDecorator("customerAddress", {
            initialValue: formData.customerAddress,
            rules: [
              {
                required: true,
                message: "Please input customer address"
              }
            ]
          })(<Input disabled={isCompleted} />)}
        </Form.Item>
        <Form.Item label="Pizza Count">
          {getFieldDecorator("count", {
            initialValue: formData.count,
            rules: [
              {
                required: true,
                message: "Please input pizza count"
              },
              {
                validator(rule: any, value: any, callback: any) {
                  if (value < 1) {
                    callback("Count must be bigger than zero");
                  }
                  callback();
                }
              }
            ]
          })(<InputNumber disabled={isCompleted} />)}
        </Form.Item>
        <Form.Item label="Pizza Type" hasFeedback>
          {getFieldDecorator("pizzaType", {
            initialValue: formData.pizzaType,
            rules: [
              { required: true, message: "Please select your pizza type!" }
            ]
          })(
            <Select
              placeholder="Please select a pizza type"
              disabled={isCompleted}
            >
              {pizzaTypes.map(pt => (
                <Option key={pt.id} value={pt.id}>
                  {pt.type}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Pizza Size" hasFeedback>
          {getFieldDecorator("pizzaSize", {
            initialValue: formData.pizzaSize,
            rules: [
              { required: true, message: "Please select your pizza size!" }
            ]
          })(
            <Select
              placeholder="Please select a pizza size"
              disabled={isCompleted}
            >
              {pizzaSizes.map(ps => (
                <Option key={ps.id} value={ps.id}>
                  {ps.size}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {formData.id > 0 && (
          <Form.Item label="Order Status" hasFeedback>
            {getFieldDecorator("orderStatus", {
              initialValue: formData.orderStatus,
              rules: [
                { required: true, message: "Please select your order status!" }
              ]
            })(
              <Select
                disabled={isCompleted || (formData.id > 0 ? false : true)}
                placeholder="Please select an order status"
              >
                {orderStatuses.map(os => (
                  <Option key={os.id} value={os.id}>
                    {os.status}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        )}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button
            className="form-button"
            type="primary"
            htmlType="submit"
            disabled={isLoading || isCompleted}
          >
            {formData.id > 0 ? "Update" : "Create"}
          </Button>
          {formData.id > 0 && (
            <Button
              className="form-button"
              type="danger"
              htmlType="button"
              onClick={onDeleteOrder}
              disabled={isLoading || isCompleted}
            >
              Delete
            </Button>
          )}
          <Button
            className="form-button"
            type="default"
            htmlType="button"
            onClick={props.onBack}
            disabled={isLoading}
          >
            Return to List
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create<OrderFormProps>({})(OrderForm);
