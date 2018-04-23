import axios from "axios";
import { getRedirectPath } from "../util";

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const ERROR_MSG = "ERROR_MSG";

const initState = {
  redirectTo: "",
  isAuth: false,
  msg: "",
  username: "",
  pwd: "",
  type: ""
};

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  };
}

function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  };
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      };
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
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
        dispatch(loginSuccess(res.data.data));
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
        dispatch(registerSuccess({ username, password, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
