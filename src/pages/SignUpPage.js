import React, { useState } from "react";
import Header from "../components/CommonComponents/Header";
import SignUpForm from "../components/SignUpComponents/SignUpForm";
import LoginForm from "../components/SignUpComponents/LoginForm";

function SignUpPage() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h1>Sign Up</h1> : <h1>Login</h1>}
        {!flag ? <SignUpForm /> : <LoginForm />}
        {!flag ? (
          <p onClick={() => setFlag(!flag)}>
            Already have an Account?{" "}
            <a style={{ color: "blue", cursor: "pointer" }}>
              Click here to Login.
            </a>
          </p>
        ) : (
          <p onClick={() => setFlag(!flag)}>
            Don't have an account?{" "}
            <a style={{ color: "blue", cursor: "pointer" }}>
              Click here to SignUp
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
