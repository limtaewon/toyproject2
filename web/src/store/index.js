import { combineReducers } from "redux";
import user from "./modules/user";
import modal from "./modules/modal";
import board from "./modules/board";

export default combineReducers({
  user,
  modal,
  board,
});
