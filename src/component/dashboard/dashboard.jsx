import React from "react";
import { connect } from "react-redux";

function Boss() {
    return <h2>Boss 看到的首页</h2>;
}

class Dashboard extends React.Component {
    render() {
        const user = this.props.user;
        const navList = [
            {
                path: "/boss",
                text: "牛人",
                icon: "boss",
                title: "牛人列表",
                component: Boss
            }
        ];

        return <Boss />;
    }
}

export default connect(state => state)(Dashboard);
