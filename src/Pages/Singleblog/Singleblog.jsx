import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../GlobalUI/PageHeader.jsx";
import Notfound from "../Notfound.jsx";
import { oldBlogs } from "../../Data/oldBlogs.js";
import TrendingBlogs from "./TrendingBlogs.jsx";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import { db } from "../../FireBase/config.js";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

export default function Singleblog({
  blogs,
  error,
  isLoading,
  language,
  oldBlogsFireStore,
}) {
  const { id } = useParams();
  const pageID = id;
  const blog = blogs.find((blog) => blog.id == pageID);

  const oldBlogFireStore = oldBlogsFireStore.find((blog) => blog.id == pageID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageID]);

  const recaptchaRef = useRef(); // Create a ref for reCAPTCHA
  const [comment, setComment] = useState(""); // State for comment input
  const [lastName, setLastName] = useState(""); // State for last name input
  const [message, setMessage] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // Validate reCAPTCHA
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    if (!comment || !lastName) {
      setMessage("Please enter your last name and comment.");
      return;
    }

    try {
      const updatedComments = [
        ...blog.comments,
        {
          name: lastName,
          comment: comment,
          time: new Date().toLocaleString(),
        },
      ];

      const blogRef = doc(db, "blogs", blog.id);
      const blogDoc = await getDoc(blogRef);

      if (blogDoc.exists()) {
        await updateDoc(blogRef, {
          comments: updatedComments,
        });
      }

      setComment("");
      setLastName("");
      setMessage("Your comment has been added successfully!");

      setTimeout(() => {
        location.reload();
      }, "1000");
    } catch (error) {
      console.error("Error adding comment:", error);
      setMessage("Oops, there was an error. Please try again later.");
    }
  };

  const handleOldBlogCommentSubmit = async (e) => {
    e.preventDefault();

    // Validate reCAPTCHA
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    if (!comment || !lastName) {
      setMessage("Please enter your last name and comment.");
      return;
    }

    try {
      // Try to find the old blog document in Firestore
      const oldBlogRef = doc(db, "oldBlogs", id);
      const oldBlogDoc = await getDoc(oldBlogRef);

      if (oldBlogDoc.exists()) {
        // If the old blog document exists, update its comments
        const updatedComments = [
          ...oldBlogDoc.data().comments,
          {
            name: lastName,
            comment: comment,
            time: new Date().toLocaleString(),
          },
        ];

        await updateDoc(oldBlogRef, {
          comments: updatedComments,
        });
      } else {
        // If the old blog document doesn't exist, create a new one
        await setDoc(oldBlogRef, {
          blogID: id,
          title: oldBlog.Title,
          content: oldBlog.Content,
          language: oldBlog.language,
          timePublished: oldBlog.Date, // Modify this to match the desired format
          trending: "false",
          comments: [
            {
              name: lastName,
              comment: comment,
              time: new Date().toLocaleString(),
            },
          ],
        });
      }

      setComment("");
      setLastName("");
      setMessage("Your comment has been added successfully!");
      setTimeout(() => {
        location.reload();
      }, "1000");
    } catch (error) {
      console.error("Error adding comment:", error);
      setMessage("Oops, there was an error. Please try again later.");
    }
  };

  if (blog) {
    if (isLoading) {
      return (
        <div className="mt-16 flex justify-center text-center text-xl">
          <p>Loading...</p>
        </div>
      ); // Display a loading message
    }

    if (error || !blog) {
      return <Notfound />;
    }

    // Extract the YouTube video ID from the videoURL
    const youtubeVideoID = extractYoutubeVideoID(blog.videoURL);

    return (
      <div className="mx-auto w-screen">
        <div className="flex justify-center">
          <img
            src={blog.image}
            alt={`blog${id}`}
            className="max-h-[550px] object-cover"
          />
        </div>

        <PageHeader css="mt-16 mb-10">{blog.title}</PageHeader>

        {blog.videoURL && youtubeVideoID && (
          <div className="w-screen mt-4">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeVideoID}`}
              title="YouTube Video"
            ></iframe>
          </div>
        )}

        <div className=" pb-8 leading-8 text-justify">
          {/* {blog.content.map((para, index) => {
            return (
              <div
                dangerouslySetInnerHTML={{ __html: para }}
                key={index}
                className="py-4"
              ></div>
            );
          })} */}
          <div className="w-screen px-[10vw] pt-8 leading-8 text-justify flex justify-center oldBlog">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
          <p className="text-lg font-bold mt-10 text-center">
            {language === "English"
              ? "Article Published by Safaa Nhairy"
              : "Article publié par Safaa Nhairy"}
          </p>
        </div>
        <hr className="mb-8" />
        <div className="">
          <h3 className="text-xl font-bold mb-1 px-[5vw] sm:px-[15vw] decoration-solid underline decoration-black underline-offset-4">
            {language === "English" ? "Comments :" : "Commentaires :"}
          </h3>
          <div className="">
            <div className="text-left  pt-1">
              {blog.comments.length > 0 ? (
                blog.comments.map((comment, idx) => {
                  return (
                    <div
                      key={idx}
                      className="my-4 py-4 px-[5vw] sm:px-[15vw] relative"
                    >
                      <span className="font-bold">{comment.name} :</span>
                      <span className="text-gray-600"> {comment.comment}</span>
                      <span className="text-[10px] text-gray-400 absolute right-[5vw] sm:right-[15vw] bottom-4">
                        {comment.time}
                      </span>
                      <hr className="mt-4" />
                    </div>
                  );
                })
              ) : (
                <div className="my-4 py-4 px-[5vw] sm:px-[15vw] ">
                  <p className="mb-4 text-gray-600">
                    {language === "English"
                      ? "No Comments Yet"
                      : "Pas encore de commentaires"}
                  </p>
                  <hr className="mt-2" />
                </div>
              )}
            </div>
            <div className=" p-4 flex flex-col items-center ">
              <h3 className="text-xl mb-4">
                {language === "English"
                  ? "Add a comment"
                  : "Ajouter un commentaire"}
              </h3>
              <form
                className="flex flex-col gap-2 items-center justiy-center w-screen"
                onSubmit={handleCommentSubmit}
              >
                <textarea
                  placeholder={
                    language === "English"
                      ? "Your comment"
                      : "Votre commentaire"
                  }
                  className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 h-16 w-[80vw] sm:w-[400px]"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder={
                    language === "English" ? "Your last name" : "Votre nom"
                  }
                  className=" border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-[80vw] sm:w-[400px]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeMb3YoAAAAAL0EULE9WK5pgHEYV17Dv_DTS5WN" // Replace with your reCAPTCHA Site Key
                />

                {message && (
                  <p
                    className={
                      message.startsWith("Oops")
                        ? "text-red-500"
                        : "text-green-600"
                    }
                  >
                    {message}
                  </p>
                )}

                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit">
                  {language === "English" ? "Submit" : "Ajoutez"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <TrendingBlogs blogs={blogs} language={language} />
      </div>
    );
  }

  const oldBlog = oldBlogs.find((oldBlog) => oldBlog.ID == id);

  if (oldBlog) {
    return (
      <div className="">
        <PageHeader css="mt-16">{oldBlog.Title}</PageHeader>
        <div className="w-screen px-[10vw] pt-8 leading-8 text-justify flex justify-center oldBlog">
          <div dangerouslySetInnerHTML={{ __html: oldBlog.Content }} />
        </div>
        <p className="text-lg font-bold mt-4 text-center">
          {language === "English"
            ? "Article Published by Safaa Nhairy"
            : "Article publié par Safaa Nhairy"}
        </p>
        <h3 className="text-xl font-bold mb-4 px-[5vw] sm:px-[15vw] decoration-solid underline decoration-black underline-offset-4">
          {language === "English" ? "Comments :" : "Commentaires :"}
        </h3>

        <div className="">
          <div className="text-left  pt-1">
            {oldBlogFireStore?.comments.length > 0 ? (
              oldBlogFireStore.comments.map((comment, idx) => {
                return (
                  <div
                    key={idx}
                    className="my-4 py-4 px-[5vw] sm:px-[15vw] relative"
                  >
                    <span className="font-bold">{comment.name} :</span>
                    <span className="text-gray-600"> {comment.comment}</span>
                    <span className="text-[10px] text-gray-400 absolute right-[5vw] sm:right-[15vw] bottom-4">
                      {comment.time}
                    </span>
                    <hr className="mt-4" />
                  </div>
                );
              })
            ) : (
              <div className="my-4  px-[5vw] sm:px-[15vw] ">
                <p className="mb-4 text-gray-600">
                  {language === "English"
                    ? "No Comments Yet"
                    : "Pas encore de commentaires"}
                </p>
                <hr className="mt-2" />
              </div>
            )}
          </div>
          <div className=" p-4 flex flex-col items-center">
            <h3 className="text-xl mb-4">
              {language === "English"
                ? "Add a comment"
                : "Ajouter un commentaire"}
            </h3>
            <form
              className="flex flex-col gap-2 items-center justiy-center w-screen"
              onSubmit={handleOldBlogCommentSubmit}
            >
              <textarea
                placeholder={
                  language === "English" ? "Your comment" : "Votre commentaire"
                }
                className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 h-16 w-[80vw] sm:w-[400px]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder={
                  language === "English" ? "Your last name" : "Votre nom"
                }
                className=" border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-[80vw] sm:w-[400px]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeMb3YoAAAAAL0EULE9WK5pgHEYV17Dv_DTS5WN" // Replace with your reCAPTCHA Site Key
              />

              {message && (
                <p
                  className={
                    message.startsWith("Oops")
                      ? "text-red-500"
                      : "text-green-600"
                  }
                >
                  {message}
                </p>
              )}

              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit">
                {language === "English" ? "Submit" : "Ajoutez"}
              </button>
            </form>
          </div>
        </div>
        <TrendingBlogs blogs={blogs} />
      </div>
    );
  }
}

// Function to extract YouTube video ID from a YouTube video URL
function extractYoutubeVideoID(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1];
}
