import LoginForm from "./components/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { auth } from "../src/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import Button from "react-bootstrap/Button";

function App() {
  const { logoutUser } = useContext(UserContext);

  //useAuthState hook from Firebase, allows us to make a user persistence that will expire in certain amount of time.
  // It gives us loading and error too, in order to increase the user experience while loading/error the user.
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    // Show a loading spinner
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    // Handle any errors
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    // User is authenticated, render authenticated content
    return (
      <div className="center-div">
        <h1>Welcome, {user.displayName}</h1>

        <Button onClick={logoutUser}>Logout</Button>
      </div>
    );
  } else {
    // User is not authenticated, render login/register form
    return (
      <>
        <LoginForm />
        <ToastContainer position="top-center" />
      </>
    );
  }
}

export default App;
