import React from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import { Route, Switch } from "react-router-dom";
import NavLinkBar from "../navlink/navlink";
import Boss from "../../component/boss/boss";
import Genius from "../../component/genius/genius";

function Msg() {
    return <h2>Msg 看到的首页</h2>;
}
function User() {
    return <h2>User 看到的首页</h2>;
}

class Dashboard extends React.Component {
    render() {
        const { pathname } = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: "/boss",
                text: "牛人",
                icon: "boss",
                title: "牛人列表",
                component: Boss,
                hide: user.type === "genius"
            },
            {
                path: "/genius",
                text: "BOSS",
                icon: "job",
                title: "Boss列表",
                component: Genius,
                hide: user.type === "boss"
            },
            {
                path: "/msg",
                text: "消息",
                icon: "msg",
                title: "消息列表",
                component: Msg
            },
            {
                path: "/me",
                text: "我",
                icon: "user",
                title: "个人中心",
                component: User
            }
        ];

        return (
            <div>
                <NavBar className="fixed-header" mode="dard">
                    {navList.find(v => v.path === pathname).title}
                </NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {navList.map(v => (
                            <Route
                                key={v.path}
                                path={v.path}
                                component={v.component}
                            />
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList} />
            </div>
        );
    }
}

export default connect(state => state)(Dashboard);
