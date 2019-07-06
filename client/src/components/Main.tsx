import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Spin, Result } from "antd";
const { Content } = Layout;
import { fetchFormFields } from "../store/actions/actions";
import Routes from "./routes";
import AppHeader from "./Header";
import { AppState } from "../store/index";

const Main: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector(
    (state: AppState) => state.FormFields
  );
  useEffect(() => {
    dispatch(fetchFormFields());
  }, []);

  if (isLoading) {
    return <Spin className="spinner" tip="Processing..."></Spin>;
  }
  if (hasError) {
    return (
      <Result
        status="error"
        title="Server Error"
        subTitle="Can not connect with the server!"
      ></Result>
    );
  }

  return (
    <Layout className="layout">
      <AppHeader></AppHeader>

      <Content style={{ height: "90vh", padding: "20px 50px" }}>
        <Routes></Routes>
      </Content>
    </Layout>
  );
};

export default Main;
