import React, { useState } from "react";
import InputComponent from "../../CommonComponents/Input";
import Button from "../../CommonComponents/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handling Login...");
    setLoading(true);

    if (email && password) {
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
        toast.success("LogIn Successful!");
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        console.log("error in Login", error);
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Email or Password is empty!");
      setLoading(false);
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
      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
    </>
  );
}

export default LoginForm;
