import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/CommonComponents/Header";

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log("My User", user);
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
    </div>
  );
}

export default Profile;
