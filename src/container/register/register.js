import React from "react";
import Logo from "../../component/logo/logo";
import {
  WingBlank,
  WhiteSpace,
  Button,
  List,
  InputItem,
  Radio
} from "antd-mobile";

const RadioItem = Radio.RadioItem;

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "genius"
    };
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>用户注册</h2>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <InputItem>密码</InputItem>
            <InputItem>确认密码</InputItem>
          </List>

          <WhiteSpace />
          <List>
            <RadioItem checked={this.state.type === "genius"}>牛人</RadioItem>
            <RadioItem checked={this.state.type === "boss"}>BOSS</RadioItem>
          </List>

          <WhiteSpace />
          <Button>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
