import React, { useState } from "react";
import InputComponent from "../../CommonComponents/Input";
import Button from "../../CommonComponents/Button";
import { auth, db, storage } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";

function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    console.log("handling signUp...");
    if (password == confirmPassword && password.length >= 6) {
      try {
        // Creating user's account in authentication section of firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);
        // Saving user's details in firestore Database
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });
        // save data in the redux, call the redux action
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        navigate("/profile");
      } catch (error) {
        console.log("error in SignIn", error);
      }
    } else {
      // throw an error
    }
  };

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        type="text"
        required={true}
        placeholder="Full Name"
      />
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
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        type="password"
        required={true}
        placeholder="Confirm Password"
      />
      <Button text="SignUp" onClick={handleSignUp} />
    </>
  );
}

export default SignUpForm;
