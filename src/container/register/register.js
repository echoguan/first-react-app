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
import { connect } from "react-redux";
import { register } from "../../redux/user.redux";

const RadioItem = Radio.RadioItem;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      repeatPassword: "",
      type: "genius"
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  handleRegister() {
    this.props.register(this.state);
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>用户注册</h2>
        <WingBlank>
          <List>
            {this.props.msg ? <p>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.handleChange("user", v)}>
              用户名
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.handleChange("password", v)}
            >
              密码
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.handleChange("repeatPassword", v)}
            >
              确认密码
            </InputItem>
          </List>

          <WhiteSpace />
          <List>
            <RadioItem
              onChange={v => this.handleChange("type", "genius")}
              checked={this.state.type === "genius"}
            >
              牛人
            </RadioItem>
            <RadioItem
              onChange={v => this.handleChange("type", "boss")}
              checked={this.state.type === "boss"}
            >
              BOSS
            </RadioItem>
          </List>

          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(state => state.user, { register })(Register);
