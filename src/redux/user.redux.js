import axios from "axios";
import { getRedirectPath } from "../util";

const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOAD_DATA = "LOAD_DATA";

const initState = {
    redirectTo: "",
    msg: "",
    username: "",
    type: ""
};

function errorMsg(msg) {
    return {
        msg,
        type: ERROR_MSG
    };
}

function authSuccess(data) {
    const { password, ...dataNoPwd } = data;
    return {
        type: AUTH_SUCCESS,
        payload: dataNoPwd
    };
}

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: "",
                redirectTo: getRedirectPath(action.payload),
                ...action.payload
            };
        case LOAD_DATA:
            return {
                ...state,
                ...action.payload
            };
        case ERROR_MSG:
            return {
                ...state,
                msg: action.msg
            };
        default:
            return state;
    }
}

export function login({ username, password }) {
    if (!username || !password) {
        return errorMsg("用户名密码必须输入");
    }

    return dispatch => {
        axios.post("/user/login", { username, password }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

export function register({ username, password, repeatPassword, type }) {
    if (!username || !password || !type) {
        return errorMsg("用户名密码必须输入");
    }
    if (password !== repeatPassword) {
        return errorMsg("两次密码输入不一致");
    }

    return dispatch => {
        axios.post("/user/register", { username, password, type }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({ username, password, type }));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

export function loadData(userInfo) {
    return {
        type: LOAD_DATA,
        payload: userInfo
    };
}

export function update(data) {
    return dispatch => {
        axios.post("/user/update", data).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.data));
            }
        });
    };
}
