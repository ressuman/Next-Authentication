import { useState, useRef } from "react";
import classes from "./auth-form.module.css";
//import { logInUser } from "@/helpers/user/logInUser";
import { createUser } from "@/helpers/user/createUser";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function validateInput(email, password) {
    return !(
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    );
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!validateInput(enteredEmail, enteredPassword)) {
      setError("Invalid credentials. Please try again.");
      return;
    }

    setError(null);

    if (isLogin) {
      //log user in
      try {
        // Handle successful login (e.g., redirect or update UI)
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });

        if (!result.error) {
          //set some auth state
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      //create user
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        // Handle successful sign-up (e.g., redirect or update UI)
        console.log(result);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {error && <p className={classes.error}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}
