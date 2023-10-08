import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../../../GlobalUI/PageHeader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../../FireBase/config";
import { doc, updateDoc } from "firebase/firestore";
import BlogPreview from "../../NewBlog/BlogPreview";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../../EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";

export default function EditSingleBlog({
  signedUser,
  blogs,
  error,
  isLoading,
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State to track preview popup
  const [pageLoading, setpageLoading] = useState(true);

  const { id } = useParams();
  const pageID = id;
  const navigate = useNavigate();

  const blog = blogs.find((blog) => blog.id == pageID);

  // console.log(blog);
  if (blog === undefined) {
    navigate("/pro-edit-blogs");
    return;
  }

  useEffect(() => {
    setTimeout(() => {
      setpageLoading(false);
    }, 1000);
  }, []);

  const [formData, setFormData] = useState({
    title: blog.title,
    image: null,
    videoURL: blog.videoURL,
    content: blog.content,
    language: blog.language,
    trending: blog.trending,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const openPreview = () => {
    setErrorMessage("");
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setErrorMessage("");
    setIsPreviewOpen(false);
  };

  const handleChange = (value) => {
    // setState({ value });
    // console.log(value);
    setFormData({
      ...formData,
      content: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error or success messages
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Upload the new image to Firebase Storage if an image is selected
      const imageFile = formData.image;
      let imageURL = formData.imageURL; // Get the current image URL

      if (imageFile) {
        const storageRef = ref(storage, "images/" + imageFile.name);
        await uploadBytes(storageRef, imageFile);

        // Get the download URL of the uploaded image
        imageURL = await getDownloadURL(storageRef);
      }

      const blogRef = doc(db, "blogs", String(pageID));

      // Prepare the data to update in Firestore
      const updatedData = {
        title: formData.title,
        videoURL: formData.videoURL,
        content: formData.content,
        language: formData.language,
        trending: formData.trending,
      };

      // Only include the image field in the update if a new image was uploaded
      if (imageFile) {
        updatedData.image = imageURL;
      }

      // Update the Firestore document with the new formData
      await updateDoc(blogRef, updatedData);

      setSuccessMessage("Blog has been updated successfully!");
    } catch (error) {
      setErrorMessage("Error updating blog: " + error.message);
    }
  };

  if (pageLoading) {
    return (
      <div className="h-[70vh] w-screen flex flex-col items-center justify-center">
        ...Loading
      </div>
    );
  }
  if (!signedUser) {
    return (
      <div className="h-[70vh] w-screen flex flex-col items-center justify-center">
        <p>Please Login to Access this page</p>
        <button
          className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 mt-4"
          onClick={() => {
            navigate("/pro-login");
          }}
        >
          Login
        </button>
      </div>
    );
  }

  if (signedUser) {
    return (
      <div className="p-4 relative w-screen overflow-x-hidden">
        <PageHeader>Edit Blog</PageHeader>
        <form onSubmit={handleSubmit} className="max-w-[90vw] mx-auto">
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
              Choose a new image: <span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
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
          <div className="mb-4 mt-8">
            <label className="block text-gray-600">
              Content: <span className="text-red-600">*</span>
            </label>
            <EditorToolbar />
            <div className="text-editor ">
              <EditorToolbar />
              <div className="max-w-[90vw]  my-8 mb-16">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder={"Write something awesome..."}
                  modules={modules}
                  formats={formats}
                />
              </div>
            </div>
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
        {isPreviewOpen ? (
          <div className="flex justify-center gap-2 my-4">
            <button
              onClick={closePreview}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close Preview
            </button>
            <a
              href={`/blog/${blog.blogID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Live View
            </a>
          </div>
        ) : (
          <div className="flex justify-center gap-2 my-4">
            <button
              onClick={openPreview}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Open Preview
            </button>
            <a
              href={`/blog/${blog.blogID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Live View
            </a>
          </div>
        )}

        {isPreviewOpen && (
          <div className="preview-popup">
            <BlogPreview
              blog={formData}
              closePreview={closePreview}
              imageURL={blog.image}
            />
          </div>
        )}
      </div>
    );
  }
}
