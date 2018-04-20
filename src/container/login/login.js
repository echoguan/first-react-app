import React from "react";
import Logo from "../../component/logo/logo";
import { WingBlank, WhiteSpace, Button, List, InputItem } from "antd-mobile";
import { connect } from "react-redux";
import { login } from "../../redux/user.redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };

    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push("./register");
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  handleLogin() {
    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        <Logo />
        <h2>请登录</h2>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleChange("username", v)}>
              用户
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.handleChange("password", v)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(state => state.username, { login })(Login);
