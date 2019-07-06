import {
  FORM_FIELDS_ERROR_ACTION,
  FORM_FIELDS_LOADING_ACTION,
  FORM_FIELDS_SET_ACTION
} from "../actions/actionTypes";

import { FormFieldsState } from "../../models";

const initialState: FormFieldsState = {
  pizzaSizes: [],
  pizzaTypes: [],
  orderStatuses: [],
  isLoading: true,
  hasError: false
};

const FormFieldsReducer = (
  state: FormFieldsState = initialState,
  action: any
): FormFieldsState => {
  switch (action.type) {
    case FORM_FIELDS_LOADING_ACTION:
      return {
        isLoading: true,
        pizzaSizes: [],
        pizzaTypes: [],
        orderStatuses: [],
        hasError: false
      };

    case FORM_FIELDS_SET_ACTION:
      return {
        isLoading: false,
        ...action.payload,
        hasError: false
      };
    case FORM_FIELDS_ERROR_ACTION:
      console.log("aaa");

      return {
        isLoading: false,
        hasError: true,
        pizzaSizes: [],
        pizzaTypes: [],
        orderStatuses: []
      };
    default:
      return state;
  }
};

export default FormFieldsReducer;
