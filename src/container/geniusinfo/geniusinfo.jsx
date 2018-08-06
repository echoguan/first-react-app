import React from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelector from "../../component/avatar-selector/avatar-selector";
import { connect } from "react-redux";
import { update } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";

class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
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
        const currentPath = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;

        return (
            <div>
                {redirectTo && redirectTo !== currentPath ? (
                    <Redirect to={this.props.redirectTo} />
                ) : null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={imgName => {
                        this.setState({
                            avatar: imgName
                        });
                    }}
                />
                <InputItem onChange={v => this.onChange("title", v)}>
                    求职岗位
                </InputItem>
                <TextareaItem
                    title="个人简介"
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
)(GeniusInfo);
