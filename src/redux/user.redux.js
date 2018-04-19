import axios from "axios";

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";

const initState = {
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

export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: "",
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
