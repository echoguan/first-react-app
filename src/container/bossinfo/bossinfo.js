import React from "react";
import { NavBar, InputItem, TextareaItem } from "antd-mobile";
import AvatarSelector from "../../component/avatar-selector/avatar-selector";

class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      salary: "",
      desc: ""
    };
  }

  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <div>
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector />
        <InputItem onChange={v => this.onChange("title", v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange("company", v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange("salary", v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          title="职位要求"
          rows={3}
          autoHeight
          onChange={v => this.onChange("desc", v)}
        />
      </div>
    );
  }
}

export default BossInfo;
