const CURRENT_SELECT = "board/CURRENT_SELECT";
const BOARD_ID = "board/BOARD_ID";
const BOARD_DROP = "board/BOARD_DROP";
const BOARD_DROP_OFF = "board/BOARD_DROP_OFF";

export const current_select = (data) => {
  return {
    type: CURRENT_SELECT,
    payload: data,
  };
};
export const board_id = (data) => {
  return {
    type: BOARD_ID,
    payload: data,
  };
};

export const board_drop = () => {
  return {
    type: BOARD_DROP,
  };
};

export const board_drop_off = () => {
  return {
    type: BOARD_DROP_OFF,
  };
};

const board_state = {
  is_drop: false,
  select: "카테고리를 선택하세요",
  id: "",
};

export default function board(state = board_state, action) {
  switch (action.type) {
    case CURRENT_SELECT:
      return {
        ...state,
        select: action.payload,
      };
    case BOARD_ID:
      return {
        ...state,
        id: action.payload,
      };
    case BOARD_DROP:
      return {
        ...state,
        is_drop: true,
      };

    case BOARD_DROP_OFF:
      return {
        ...state,
        is_drop: false,
      };
    default:
      return state;
  }
}
