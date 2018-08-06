import React from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelector from "../../component/avatar-selector/avatar-selector";
import { connect } from "react-redux";
import { update } from "../../redux/user.redux";

class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            company: "",
            salary: "",
            desc: "",
            avatar: ""
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
                <AvatarSelector
                    selectAvatar={imgName => {
                        this.setState({
                            avatar: imgName
                        });
                    }}
                />
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
                <Button
                    onClick={() => {
                        this.props.update(this.state);
                    }}
                    type="primary"
                >
                    保存
                </Button>
            </div>
        );
    }
}

export default connect(
    state => state.user,
    { update }
)(BossInfo);
