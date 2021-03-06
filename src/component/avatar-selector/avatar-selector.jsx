import React from "react";
import { Grid, List } from "antd-mobile";
import PropTypes from "prop-types";

class AvatarSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const avatarList = "girl, boy, woman, man, bull, chick, crab, hedgehog, hippopotamus, koala, lemur, pig, tiger, whale, zebra"
            .split(", ")
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }));

        const gridHeader = this.state.icon ? (
            <div>
                <span>已选择头像</span>
                <img
                    style={{ width: 20 }}
                    src={this.state.icon}
                    alt={this.state.text}
                />
            </div>
        ) : (
            <div>请选择头像</div>
        );

        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={ele => {
                            this.setState(ele);
                            this.props.selectAvatar(ele.text);
                        }}
                    />
                </List>
            </div>
        );
    }

    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    };
}

export default AvatarSelector;
