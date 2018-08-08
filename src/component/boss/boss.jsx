import React from "react";
import { connect } from "react-redux";

import { Card, WhiteSpace, WingBlank } from "antd-mobile";
import { getUserList } from "../../redux/chatuser.redux";

class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.props.getUserList("genius");
    }

    render() {
        return (
            <WingBlank>
                {this.props.userList.map(
                    v =>
                        v.avatar ? (
                            <Card key={v._id}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                />
                                <Card.Body>
                                    {v.desc
                                        .split("\n")
                                        .map(v => <div key={v}>{v}</div>)}
                                </Card.Body>
                            </Card>
                        ) : null
                )}
            </WingBlank>
        );
    }
}

export default connect(
    state => state.chatuser,
    { getUserList }
)(Boss);
