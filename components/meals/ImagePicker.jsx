"use client";
import classes from "./imagePicker.module.css";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ImagePicker({ name, label }) {
  const [pickedImage, setPickedImage] = useState();
  const inputRef = useRef();

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} fill alt="Image selected by you" />
          )}
        </div>

        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          className={classes.input}
          name={name}
          ref={inputRef}
          onChange={handleImageChange}
        />
        <button
          type="button"
          className={classes.button}
          onClick={handleButtonClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
