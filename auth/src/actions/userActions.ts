import { ActionTypes } from "../action-type/ActionTypes";
import { User } from "../context/UserContext";


//Creating an interface to each one of the actions
interface TogglePage {
  type: ActionTypes.TOGGLE_PAGE;
}
interface LoginBegin {
  type: ActionTypes.LOGIN_BEGIN;
}

interface LoginError {
  type: ActionTypes.LOGIN_ERROR;
  payload: string;
}

interface LoginSuccess {
  type: ActionTypes.LOGIN_SUCCESS;
  payload: User;
}

interface RegisterBegin {
  type: ActionTypes.REGISTER_BEGIN;
}

interface RegisterError {
  type: ActionTypes.REGISTER_ERROR;
  payload: string;
}

interface RegisterSuccess {
  type: ActionTypes.REGISTER_SUCCESS;
  payload: User;
}

export type UserActions =
  | LoginBegin
  | LoginError
  | LoginSuccess
  | TogglePage
  | RegisterBegin
  | RegisterError
  | RegisterSuccess;
