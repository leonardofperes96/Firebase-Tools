import { createContext, useReducer } from "react";
import { userReducer as reducer } from "../reducers/userReducer";
import { ActionTypes } from "../action-type/ActionTypes";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "../utils/firebase";

//Context initial state
const initialState = {
  isRegistered: true,
  user: {},
  loading: false,
  error: "",
  loginUser: () => {
    /* Do nothing.\n}*/
  },
  logoutUser: () => {
    /* Do nothing.\n}*/
  },
  registerUser: () => {
    /* Do nothing.\n}*/
  },
  changePage: () => {
    /* Do nothing.\n}*/
  },
};

//Creating an user interface with the values that i will destructure
export interface User {
  uid?: string;
  displayName?: string | null;
  userEmail?: string | null;
}

//Creating the Context Type interface
export interface UserContextType {
  isRegistered: boolean;
  user?: User;
  loading: boolean;
  error: string;
  loginUser: (email: string, password: string) => void;
  registerUser: (email: string, password: string, displayName: string) => void;
  logoutUser: () => void;
  changePage: () => void;
}

//Creating UserContext
export const UserContext = createContext<UserContextType>(initialState);

export const UserContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //login function
  const loginUser = async (email: string, password: string) => {
    // start loading
    dispatch({ type: ActionTypes.LOGIN_BEGIN });
    try {
      //Login with email and password method from firebase
      // This method needs 3 arguments: auth, user email and user password
      const response = await signInWithEmailAndPassword(auth, email, password);

      // Destructuring the object user from response, to get just the values that i want to.
      const { displayName, uid, email: userEmail } = response.user;

      // Dispatching login action
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: { displayName, uid, userEmail },
      });
    } catch (err) {
      if (err instanceof Error) {
        //React toastify to display nice error messages
        toast.error(err.message);

        //Dispatching error action
        dispatch({
          type: ActionTypes.LOGIN_ERROR,
          payload: err.message,
        });
      }
    }
  };

  // Register function
  const registerUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    //Start loading
    dispatch({ type: ActionTypes.REGISTER_BEGIN });
    try {
      //Destructuring user object from the response from register with email and password Firebase Method
      //
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //updateProfile method, im using to update the username displayName, but it can be used to update the Photo too.
      // this method needs to have user object, and the second argument its optional, either displayName or photoURL can be used
      // in order to update the profile of the user
      await updateProfile(user, { displayName: username });

      //destructuring what i need
      const { displayName, email: userEmail, uid } = user;

      // dispatching register sucessfull action
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
        payload: { displayName, userEmail, uid },
      });
    } catch (err) {
      if (err instanceof Error) {
        //react toastify nice error messages
        toast.error(err.message);
        dispatch({
          type: ActionTypes.REGISTER_ERROR,
          payload: err.message,
        });
      }
    }
  };

  // function to logging user out, it needs to have the auth argument.
  const logoutUser = async () => {
    await signOut(auth);
    // nice feedback after the log out.
    toast.success("Logging out!");
  };

  // Change the page state
  const changePage = () => {
    dispatch({ type: ActionTypes.TOGGLE_PAGE });
  };

  return (
    <UserContext.Provider
      value={{ ...state, loginUser, registerUser, logoutUser, changePage }}
    >
      {children}
    </UserContext.Provider>
  );
};
