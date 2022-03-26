const SET_LOGIN_THEN_CLOSE = "modal/SET_LOGIN_THEN_CLOSE";
const SET_LOGIN_THEN_OPEN_WINDOW = "modal/SET_LOGIN_THEN_OPEN_WINDOW";
const SET_WRITE_THEN_CLOSE = "modal/SET_WRITE_THEN_CLOSE";
const SET_WRITE_THEN_OPEN_WINDOW = "modal/SET_WRITE_THEN_OPEN_WINDOW";

export const set_login_then_close = () => {
  return {
    type: SET_LOGIN_THEN_CLOSE,
  };
};

export const set_login_then_open_window = () => {
  return {
    type: SET_LOGIN_THEN_OPEN_WINDOW,
  };
};

export const set_write_then_close = () => {
  return {
    type: SET_WRITE_THEN_CLOSE,
  };
};

export const set_write_then_open_window = () => {
  return {
    type: SET_WRITE_THEN_OPEN_WINDOW,
  };
};

const modal_state = {
  login_modal: false,
  write_modal: false,
};

export default function modal(state = modal_state, action) {
  switch (action.type) {
    case SET_LOGIN_THEN_CLOSE:
      return {
        ...state,
        login_modal: false,
      };
    case SET_LOGIN_THEN_OPEN_WINDOW:
      return {
        ...state,
        login_modal: true,
      };
    case SET_WRITE_THEN_OPEN_WINDOW:
      return {
        ...state,
        write_modal: true,
      };
    case SET_WRITE_THEN_CLOSE:
      return {
        ...state,
        write_modal: false,
      };
    default:
      return state;
  }
}
