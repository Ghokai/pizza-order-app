export interface OrderStatus {
  id: number;
  status: string;
}

export interface PizzaSize {
  id: number;
  size: string;
}

export interface PizzaType {
  id: number;
  type: string;
}

export interface PizzaOrder {
  id: number;
  count: number;
  orderDate: Date;
  customerName: string;
  customerAddress: string;
  pizzaType: PizzaType;
  pizzaSize: PizzaSize;
  orderStatus: OrderStatus;
}

export interface FormFieldsState {
  pizzaSizes: PizzaSize[];
  pizzaTypes: PizzaType[];
  orderStatuses: OrderStatus[];
  isLoading: boolean;
  hasError: boolean;
}

export interface PizzaOrdersState {
  orders: PizzaOrder[];
  isLoading: boolean;
  hasError: boolean;
}

export interface OrderDetailState {
  detail: PizzaOrder;
  isLoading: boolean;
  hasError: boolean;
}
