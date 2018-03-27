import React from "react";
import Logo from "../../component/logo/logo";
import { WingBlank, WhiteSpace, Button } from "antd-mobile";
// import "antd-mobile/dist/antd-mobile.css";

class Register extends React.Component {
  render() {
    return (
      <div>
        <Logo />
        <h2>Register Page</h2>
        <WingBlank>
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary">注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
