import React from "react";
import Header from "../components/CommonComponents/Header";
import CreatePodcastForm from "../components/StartAPodcast/CreatePodcastForm";

function CreatePodcast() {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreatePodcastForm />
      </div>
    </div>
  );
}

export default CreatePodcast;
