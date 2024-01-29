import React, { useState } from "react";
import InputComponent from "../../CommonComponents/Input";
import Button from "../../CommonComponents/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../../../slices/userSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handling Login...");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Getting user's details from firestore Database
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
      console.log("UserData", userData);

      dispatch(
        setUser({
          name: userData.name,
          email: user.email,
          uid: user.uid,
        })
      );
      navigate("/profile");
    } catch (error) {
      console.log("error in Login", error);
    }
  };
  return (
    <>
      <InputComponent
        state={email}
        setState={setEmail}
        type="text"
        required={true}
        placeholder="Email"
      />
      <InputComponent
        state={password}
        setState={setPassword}
        type="password"
        required={true}
        placeholder="Password"
      />
      <Button text="Login" onClick={handleLogin} />
    </>
  );
}

export default LoginForm;
