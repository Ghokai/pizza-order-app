import {
  DETAIL_LOADING_ACTION,
  DETAIL_ERROR_ACTION,
  DETAIL_SET_ACTION,
  DETAIL_CLEAR_ACTION
} from "../actions/actionTypes";

import { OrderDetailState } from "../../models";

const initialState: OrderDetailState = {
  detail: null,
  isLoading: false,
  hasError: false
};

const OrderDetailReducer = (
  state: OrderDetailState = initialState,
  action: any
): OrderDetailState => {
  switch (action.type) {
    case DETAIL_LOADING_ACTION:
      return {
        isLoading: true,
        detail: null,
        hasError: false
      };

    case DETAIL_SET_ACTION:
      return {
        isLoading: false,
        detail: action.payload,
        hasError: false
      };
    case DETAIL_ERROR_ACTION:
      return {
        isLoading: false,
        hasError: true,
        detail: null
      };
    case DETAIL_CLEAR_ACTION:
      return {
        isLoading: false,
        hasError: false,
        detail: null
      };
    default:
      return state;
  }
};

export default OrderDetailReducer;
