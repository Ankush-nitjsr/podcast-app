import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputComponent from "../CommonComponents/Input";
import Button from "../CommonComponents/Button";
import FileInput from "../CommonComponents/Input/FileInput";

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (title && desc && displayImage && bannerImage) {
      // 1. Upload files -> get downloadable links
      // 2. create a new doc in a new collection called podcasts
      // 3. save this new podcast episodes states in pur podcast
      toast.success("Podcast created successfully!");
    } else {
      toast.error("Please Enter All Values");
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        type="text"
        required={true}
        placeholder="Title"
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        type="text"
        required={true}
        placeholder="Description"
      />
      <FileInput
        accept={"images/*"}
        id="display-image-input"
        imageHandleFunc={displayImageHandle}
        text={"Upload Display Image"}
      />
      <FileInput
        accept={"images/*"}
        id="banner-image-input"
        imageHandleFunc={bannerImageHandle}
        text={"Upload Banner Image"}
      />
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
}

export default CreatePodcastForm;
