import React from "react";
import PropTypes from "prop-types";
import { Card, WhiteSpace, WingBlank } from "antd-mobile";

class UserCard extends React.Component {
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

    static propTypes = {
        userList: PropTypes.array.isRequired
    };
}

export default UserCard;
