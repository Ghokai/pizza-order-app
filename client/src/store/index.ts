import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import FormFieldsReducer from "./reducers/formFieldsReducer";
import PizzaOrdersReducer from "./reducers/pizzaOrdersReducer";
import OrderDetailReducer from "./reducers/orderDetailReducer";

export const rootReducer = combineReducers({
  FormFields: FormFieldsReducer,
  PizzaOrders: PizzaOrdersReducer,
  OrderDetail: OrderDetailReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
