import {
  ORDERS_ERROR_ACTION,
  ORDERS_LOADING_ACTION,
  ORDERS_SET_ACTION
} from "../actions/actionTypes";

import { PizzaOrdersState } from "../../models";

const initialState: PizzaOrdersState = {
  orders: [],
  isLoading: false,
  hasError: false
};

const PizzaOrdersReducer = (
  state: PizzaOrdersState = initialState,
  action: any
): PizzaOrdersState => {
  switch (action.type) {
    case ORDERS_LOADING_ACTION:
      return {
        isLoading: true,
        orders: [],
        hasError: false
      };

    case ORDERS_SET_ACTION:
      return {
        isLoading: false,
        orders: action.payload,
        hasError: false
      };
    case ORDERS_ERROR_ACTION:
      return {
        isLoading: false,
        hasError: true,
        ...state
      };
    default:
      return state;
  }
};

export default PizzaOrdersReducer;
