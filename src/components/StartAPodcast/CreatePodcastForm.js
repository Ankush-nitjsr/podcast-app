import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputComponent from "../CommonComponents/Input";
import Button from "../CommonComponents/Button";
import FileInput from "../CommonComponents/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      try {
        // 1. Upload files -> get downloadable links
        // create a reference to the display image
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}` // this creates a folder named podcasts and then file name with uid
        );
        await uploadBytes(displayImageRef, displayImage);

        // get downloadable link
        const displayImageUrl = await getDownloadURL(displayImageRef);
        // console.log("Image URL is:", displayImageUrl);

        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}` // this creates a folder named podcasts and then file name with uid
        );
        await uploadBytes(bannerImageRef, bannerImage);

        // get downloadable link
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        // 2. create a new doc in a new collection called podcasts
        // 3. save this new podcast episodes states in pur podcast
        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        toast.success("Podcast Created Successfully!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      }
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
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
