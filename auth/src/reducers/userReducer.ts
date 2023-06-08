import { ActionTypes } from "../action-type/ActionTypes";
import { UserContextType } from "../context/UserContext";
import { UserActions } from "../actions/userActions";

export const userReducer = (
  state: UserContextType,
  action: UserActions
): UserContextType => {
  switch (action.type) {
    case ActionTypes.TOGGLE_PAGE:
      return { ...state, isRegistered: !state.isRegistered };
    case ActionTypes.LOGIN_BEGIN:
      return { ...state, loading: true };
    case ActionTypes.LOGIN_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case ActionTypes.REGISTER_BEGIN:
      return { ...state, loading: true };
    case ActionTypes.REGISTER_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.REGISTER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
};
