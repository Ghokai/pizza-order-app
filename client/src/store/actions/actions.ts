import { Dispatch } from "redux";
import axios from "axios";
import {
  FORM_FIELDS_SET_ACTION,
  FORM_FIELDS_LOADING_ACTION,
  FORM_FIELDS_ERROR_ACTION,
  ORDERS_ERROR_ACTION,
  ORDERS_LOADING_ACTION,
  ORDERS_SET_ACTION,
  DETAIL_ERROR_ACTION,
  DETAIL_LOADING_ACTION,
  DETAIL_SET_ACTION
} from "./actionTypes";

const serverUrl: string = "http://localhost:4000/";

export const fetchFormFields = () => async (dispatch: Dispatch) => {
  dispatch({
    type: FORM_FIELDS_LOADING_ACTION
  });

  try {
    const response = await axios.get(serverUrl + "formfields");

    dispatch({
      type: FORM_FIELDS_SET_ACTION,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FORM_FIELDS_ERROR_ACTION
    });
  }
};

export const fetchPizzaOrders = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ORDERS_LOADING_ACTION
  });

  try {
    const response = await axios.get(serverUrl + "orders");

    dispatch({
      type: ORDERS_SET_ACTION,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ORDERS_ERROR_ACTION
    });
  }
};

export const fetchOrderDetail = (orderId: number) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: DETAIL_LOADING_ACTION
  });

  try {
    const response = await axios.get(serverUrl + "orders/" + orderId);

    dispatch({
      type: DETAIL_SET_ACTION,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ERROR_ACTION
    });
  }
};

export const createorUpdateOrder = (orderData: any) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: ORDERS_LOADING_ACTION
  });

  try {
    const response = await axios.post(serverUrl + "orders", orderData);
  } catch (error) {
    dispatch({
      type: ORDERS_ERROR_ACTION
    });
  }
};

export const deleteOrder = (orderId: number) => async (dispatch: Dispatch) => {
  dispatch({
    type: ORDERS_LOADING_ACTION
  });

  try {
    const response = await axios.delete(serverUrl + "orders/" + orderId);
  } catch (error) {
    dispatch({
      type: ORDERS_ERROR_ACTION
    });
  }
};
