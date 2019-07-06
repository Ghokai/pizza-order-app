import * as React from "react";
import { PageHeader, Icon } from "antd";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";

interface HeaderProps extends RouteComponentProps<any> {}

const Header: React.FC<HeaderProps> = (
  props: HeaderProps
): React.ReactElement => {
  const gotoNewOrder = () => {
    props.history.push("/neworder");
  };
  const gotoOrderList = () => {
    props.history.push("/");
  };

  const links = (
    <div className="header-link">
      <Icon
        className="link-icon"
        onClick={gotoOrderList}
        type="unordered-list"
      />
      <Icon className="link-icon" onClick={gotoNewOrder} type="plus-circle" />
    </div>
  );

  return <PageHeader title="Pizza Order App ;)" extra={links}></PageHeader>;
};

export default withRouter(Header);
