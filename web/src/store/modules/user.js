//액션타입
const LOGIN = "user/LOGIN";
const TOKEN = "user/TOKEN";
const LOGOUT = "user/LOGOUT";
//액션
export const login = (dataforLogin) => {
  return {
    type: LOGIN,
    payload: dataforLogin,
  };
};

export const token = (dataforLogin) => {
  return {
    type: TOKEN,
    payload: dataforLogin,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

//state
const user_info = {
  email: "null",
  nickname: "null",
  login: false,
};

//reducer;
export default function user(state = user_info, action) {
  switch (action.type) {
    case LOGIN:
      if (action.payload.data.token) {
        localStorage.setItem("token", action.payload.data.token);
      } else {
        localStorage.removexItem("token");
      }
      return {
        ...state,
        email: action.payload.data.email,
        nickname: action.payload.data.nickname,
        login: true,
      };
    case TOKEN:
      if (action.payload.data.token)
        return {
          ...state,
          email: action.payload.data.email,
          nickname: action.payload.data.nickname,
          login: true,
        };
      else {
        return "error";
      }
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        email: "null",
        nickname: "null",
        login: false,
      };
    default:
      return state;
  }
}
