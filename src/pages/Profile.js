import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/CommonComponents/Header";
import Button from "../components/CommonComponents/Button";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log("My User", user);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logged out successfull");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <p>
        <label>Name: </label>
        <b>{user.name}</b>
      </p>
      <p>
        <label>Email: </label>
        <b>{user.email}</b>
      </p>
      <p>
        <label>UID: </label>
        <b>{user.uid}</b>
      </p>
      <Button text={"Logout"} onClick={handleLogout} />
    </div>
  );
}

export default Profile;
