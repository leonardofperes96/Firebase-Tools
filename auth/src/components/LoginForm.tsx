import Form from "react-bootstrap/Form";
import styles from "./LoginForm.module.css";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
// const initialState = {
//   email: "",
//   displayName: "",
//   password: "",
// };

const LoginForm = () => {
  const { loginUser, isRegistered, changePage, registerUser, loading } =
    useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  // const handleFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setFormValues((prev) => {
  //     return { ...prev, [name]: value };
  //   });
  // };

  const handleChangePage = () => {
    changePage();
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ((!displayName && !isRegistered) || !email || !password) {
      toast.error("Please fill all the fields.");
      return;
    }

    if (isRegistered) {
      loginUser(email, password);
      return;
    }

    registerUser(email, password, displayName);
  };

  return (
    <div className={styles.form_container}>
      <h2>{isRegistered ? "Login" : "Register"}</h2>
      <Form onSubmit={handleFormSubmit} id={styles.form}>
        {!isRegistered && (
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
          />
        </Form.Group>
        <Button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </Form>
      <p className={styles.info}>
        {isRegistered ? "Not a member yet? " : "Already a member?"}
        <button onClick={handleChangePage} className="main-btn">
          {isRegistered ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
