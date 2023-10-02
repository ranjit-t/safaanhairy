import React, { useState } from "react";
import PageHeader from "../../GlobalUI/PageHeader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../FireBase/config.js";
import { doc, setDoc } from "firebase/firestore";
import PostPermission from "./PostPermission";

const NewBlog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    videoURL: "",
    content: [""],
    language: "English",
    trending: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const handleAddContent = () => {
    setFormData({
      ...formData,
      content: [...formData.content, ""],
    });
  };

  const handleRemoveContent = (index) => {
    if (formData.content.length > 1) {
      const newContent = [...formData.content];
      newContent.splice(index, 1);
      setFormData({
        ...formData,
        content: newContent,
      });
    }
  };

  const handleContentChange = (index, contentText) => {
    const newContent = [...formData.content];
    newContent[index] = contentText;
    setFormData({
      ...formData,
      content: newContent,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error or success messages
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Reference to Firebase Storage bucket
      const storageRef = ref(storage, "images/" + formData.image.name);

      // Upload the image file to Firebase Storage
      await uploadBytes(storageRef, formData.image);

      // Get the download URL of the uploaded image
      const imageURL = await getDownloadURL(storageRef);

      // Create an object with all the data, including the imageURL
      const dataToUpload = {
        blogID: Math.floor(Math.random() * 100000),
        title: formData.title,
        image: imageURL,
        videoURL: formData.videoURL,
        content: formData.content,
        language: formData.language,
        trending: formData.trending,
      };

      // Log the data with the image URL
      console.log(dataToUpload);

      const customDocRef = doc(db, "blogs", String(dataToUpload.blogID));

      // Set the data using the custom document reference
      await setDoc(customDocRef, dataToUpload);

      // Set the success message
      setSuccessMessage("Blog has been added successfully!");

      // Clear the form
      setFormData({
        title: "",
        image: null,
        videoURL: "",
        content: [""],
        language: "English",
      });
    } catch (error) {
      // Set the error message
      setErrorMessage("Error adding blog: " + error.message);
    }
  };

  if (!isLoggedIn) {
    return <PostPermission onLogin={() => setIsLoggedIn(true)} />;
  }

  if (isLoggedIn) {
    return (
      <div className="p-4">
        <PageHeader>New Blog</PageHeader>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600">
              Title: <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-600">
              Upload Image: <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="videoURL" className="block text-gray-600">
              Video URL:
            </label>
            <input
              type="text"
              id="videoURL"
              name="videoURL"
              value={formData.videoURL}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">
              Content: <span className="text-red-600">*</span>
            </label>
            {formData.content.map((contentText, index) => (
              <div key={index} className="flex items-center mb-2">
                <textarea
                  value={contentText}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className="flex-grow border rounded-md px-3 py-2 mr-2 focus:outline-none focus:border-blue-500 h-32"
                  required
                />
                {formData.content.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveContent(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddContent}
              className="mt-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Add Paragraph
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block text-gray-600">
              Language: <span className="text-red-600">*</span>
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="English">English</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="trending" className="block text-gray-600">
              Trending ? : <span className="text-red-600">*</span>
            </label>
            <select
              id="trending"
              name="trending"
              value={formData.trending}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          {errorMessage && (
            <div className="text-red-600 mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 mb-4">{successMessage}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
};

export default NewBlog;
