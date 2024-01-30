import React, { useState } from "react";
import "./styles.css";

function FileInput({ accept, id, imageHandleFunc, text }) {
  const [fileSelected, setFileSelected] = useState("");

  const handleUploadBannerImage = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    imageHandleFunc(e.target.files[0]);
  };
  return (
    <>
      <label
        htmlFor={id}
        className={`custom-input ${!fileSelected ? "label-input" : "active"}`}
      >
        {fileSelected ? `Selected image: ${fileSelected}` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={handleUploadBannerImage}
      />
    </>
  );
}

export default FileInput;
