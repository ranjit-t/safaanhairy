import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../GlobalUI/PageHeader.jsx";
import Notfound from "../Notfound.jsx";
import { oldBlogs } from "../../Data/oldBlogs.js";
import TrendingBlogs from "./TrendingBlogs.jsx";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import { db } from "../../FireBase/config.js";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import user from "../../Images/user.png";
import FB from "../../Images/facebook.png";
import LinkedIn from "../../Images/linkedin.png";
import useUserChange from "../../Util/Hooks/useUserChange.jsx";
import SafaaIcon from "../../Images/safaaIcon.jpeg";

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

  const signedUser = useUserChange();

  const recaptchaRef = useRef(); // Create a ref for reCAPTCHA
  const [comment, setComment] = useState(""); // State for comment input
  const [lastName, setLastName] = useState(""); // State for last name input
  const [message, setMessage] = useState("");

  // State to store which comments have their reply forms open
  const [openReplyForms, setOpenReplyForms] = useState({});

  const toggleReplyForm = (commentIndex) => {
    setOpenReplyForms((prev) => {
      const newOpenReplyForms = {};
      for (const key in prev) {
        newOpenReplyForms[key] = false;
      }
      newOpenReplyForms[commentIndex] = !prev[commentIndex];
      return newOpenReplyForms;
    });
  };

  const [replyComment, setReplyComment] = useState(""); // State for comment input
  const [replyLastName, setReplyLastName] = useState(""); // State for last name input

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
      let updatedComments;

      if (signedUser) {
        updatedComments = [
          ...blog.comments,
          {
            name: "Safaa",
            comment: comment,
            time: new Date().toLocaleString(),
            uid: signedUser?.uid,
            email: signedUser?.email,
          },
        ];
      } else {
        updatedComments = [
          ...blog.comments,
          {
            name: lastName,
            comment: comment,
            time: new Date().toLocaleString(),
          },
        ];
      }

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
        // const updatedComments = [
        //   ...oldBlogDoc.data().comments,
        //   {
        //     name: lastName,
        //     comment: comment,
        //     time: new Date().toLocaleString(),
        //   },
        // ];

        let updatedComments;

        if (signedUser) {
          updatedComments = [
            ...oldBlogDoc.data().comments,
            {
              name: "Safaa",
              comment: comment,
              time: new Date().toLocaleString(),
              uid: signedUser?.uid,
              email: signedUser?.email,
            },
          ];
        } else {
          updatedComments = [
            ...oldBlogDoc.data().comments,
            {
              name: lastName,
              comment: comment,
              time: new Date().toLocaleString(),
            },
          ];
        }

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

  const handleReply = async (e, commentIndex) => {
    e.preventDefault();

    // Validate reCAPTCHA
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    if (!replyComment || !replyLastName) {
      setMessage("Please enter your last name and comment.");
      return;
    }

    try {
      // Create a new reply object
      let newReply;

      if (signedUser) {
        newReply = {
          name: "Safaa",
          reply: replyComment,
          time: new Date().toLocaleString(),
          uid: signedUser?.uid,
          email: signedUser?.email,
        };
      } else {
        newReply = {
          name: replyLastName,
          reply: replyComment,
          time: new Date().toLocaleString(),
        };
      }

      // Clone the existing comments array
      const updatedComments = [...blog.comments];

      // Add the reply to the specified comment's replies array
      if (!updatedComments[commentIndex].replies) {
        updatedComments[commentIndex].replies = [newReply];
      } else {
        updatedComments[commentIndex].replies.push(newReply);
      }

      // Update the comment in Firestore
      const dataBase = blog !== null ? "blogs" : "oldBlogs";
      const blogRef = doc(db, dataBase, id);
      const blogDoc = await getDoc(blogRef);

      if (blogDoc.exists()) {
        await updateDoc(blogRef, {
          comments: updatedComments,
        });
      }

      setReplyComment("");
      setReplyLastName("");
      setMessage("Your reply has been added successfully!");

      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error adding reply:", error);
      setMessage("Oops, there was an error. Please try again later.");
    }
  };

  const handleReplyOldBlogs = async (e, commentIndex) => {
    e.preventDefault();

    // Validate reCAPTCHA
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    if (!replyComment || !replyLastName) {
      setMessage("Please enter your last name and comment.");
      return;
    }

    try {
      if (oldBlogFireStore) {
        const oldBlogComments = oldBlogFireStore.comments || [];

        // Create a new reply object
        let newReply;

        if (signedUser) {
          newReply = {
            name: "Safaa",
            reply: replyComment,
            time: new Date().toLocaleString(),
            uid: signedUser?.uid,
            email: signedUser?.email,
          };
        } else {
          newReply = {
            name: replyLastName,
            reply: replyComment,
            time: new Date().toLocaleString(),
          };
        }

        // Clone the existing comments array
        const updatedComments = [...oldBlogComments];

        // Add the reply to the specified comment's replies array
        if (!updatedComments[commentIndex].replies) {
          updatedComments[commentIndex].replies = [newReply];
        } else {
          updatedComments[commentIndex].replies.push(newReply);
        }

        // Update the comment in Firestore
        const oldBlogRef = doc(db, "oldBlogs", id);
        const oldBlogDoc = await getDoc(oldBlogRef);

        if (oldBlogDoc.exists()) {
          await updateDoc(oldBlogRef, {
            comments: updatedComments,
          });
        }

        setReplyComment("");
        setReplyLastName("");
        setMessage("Your reply has been added successfully!");

        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        setMessage("Error: Blog data not available.");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      setMessage("Oops, there was an error. Please try again later.");
    }
  };

  //
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
          <div className="flex justify-end w-[90vw]">
            Share on &nbsp;
            <button onClick={shareOnFacebook}>
              <img src={FB} alt="Facebook" className="w-10 mx-2" />
            </button>
            <button onClick={shareOnLinkedIn} className="w-10">
              <img src={LinkedIn} alt="Facebook" />
            </button>
          </div>
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
                    <div key={idx}>
                      <div className="my-4 py-4 px-[5vw] sm:px-[15vw] relative flex items-start">
                        {comment.uid === "p7KDzyiC6JMf4vnp2oEW94y92En1" ? (
                          <img
                            src={SafaaIcon}
                            alt="user"
                            className="w-10 mr-2 -mt-3 rounded-full"
                          />
                        ) : (
                          <img
                            src={user}
                            alt="user"
                            className="w-10 mr-2 -mt-3"
                          />
                        )}
                        <span className="font-bold">{comment.name} : </span>
                        <span> </span>
                        <span className="text-gray-600 w-[55vw]">
                          &nbsp; {comment.comment}
                        </span>
                        <span className="text-[10px] text-gray-400 absolute right-[5vw] sm:right-[15vw] bottom-1">
                          {comment.time}
                        </span>
                        <button
                          className="font-bold absolute top-4 right-[5vw] sm:right-[15vw] bottom-4"
                          onClick={() => {
                            toggleReplyForm(idx); // Open/close the reply form
                          }}
                        >
                          {language === "English" ? "Reply" : "Répondre"}
                        </button>
                      </div>
                      {comment.replies && (
                        <div className="flex flex-col items-center mb-8 mx-[50px]">
                          <p className="text-left">
                            {language === "English" ? "Replies" : "Réponses"}
                          </p>
                          {comment.replies.map((reply, replyIdx) => {
                            return (
                              <div key={replyIdx}>
                                <div className="my-4 py-4 pt-1 px-[5vw] sm:px-[15vw] relative flex items-start">
                                  {reply.uid ===
                                  "p7KDzyiC6JMf4vnp2oEW94y92En1" ? (
                                    <img
                                      src={SafaaIcon}
                                      alt="user"
                                      className="w-10 mr-2 -mt-3 rounded-full"
                                    />
                                  ) : (
                                    <img
                                      src={user}
                                      alt="user"
                                      className="w-10 mr-2 -mt-3"
                                    />
                                  )}
                                  <span className="font-bold ">
                                    {reply.name}
                                  </span>
                                  <span>&nbsp;:</span>
                                  <span className="text-gray-600 w-[55vw]">
                                    &nbsp; {reply.reply}
                                  </span>
                                  <span className="text-[10px] text-gray-400 absolute right-[5vw] sm:right-[15vw] bottom-1">
                                    {reply.time}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {openReplyForms[idx] && (
                        <div className=" p-4 flex flex-col items-center mb-2">
                          <h3 className="text-xl mb-4">
                            {language === "English"
                              ? "Add a reply"
                              : "Ajouter une réponse"}
                          </h3>
                          <form
                            className="flex flex-col gap-2 items-center justiy-center w-screen"
                            onSubmit={(e) => {
                              handleReply(e, idx);
                            }}
                          >
                            <textarea
                              placeholder={
                                language === "English"
                                  ? "Your comment"
                                  : "Votre commentaire"
                              }
                              className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 h-16 w-[80vw] sm:w-[400px]"
                              value={replyComment}
                              onChange={(e) => setReplyComment(e.target.value)}
                              required
                            />
                            <input
                              type="text"
                              placeholder={
                                language === "English"
                                  ? "Your last name"
                                  : "Votre nom"
                              }
                              className=" border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-[80vw] sm:w-[400px]"
                              value={replyLastName}
                              onChange={(e) => setReplyLastName(e.target.value)}
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
                      )}
                      <div className="flex justify-center -mt-4">
                        <div className="horizontal-line"></div>
                      </div>
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
                  <div key={idx}>
                    <div className="my-4 py-4 px-[5vw] sm:px-[15vw] relative flex items-start">
                      {comment.uid === "p7KDzyiC6JMf4vnp2oEW94y92En1" ? (
                        <img
                          src={SafaaIcon}
                          alt="user"
                          className="w-10 mr-2 -mt-3 rounded-full"
                        />
                      ) : (
                        <img
                          src={user}
                          alt="user"
                          className="w-10 mr-2 -mt-3"
                        />
                      )}
                      <span className="font-bold">{comment.name} : </span>
                      <span> </span>
                      <span className="text-gray-600 w-[55vw]">
                        &nbsp; {comment.comment}
                      </span>
                      <span className="text-[10px] text-gray-400 absolute right-[5vw] sm:right-[15vw] bottom-1">
                        {comment.time}
                      </span>
                      <button
                        className="font-bold absolute top-4 right-[5vw] sm:right-[15vw] bottom-4"
                        onClick={() => {
                          toggleReplyForm(idx); // Open/close the reply form
                        }}
                      >
                        {language === "English" ? "Replies" : "Réponses"}
                      </button>
                    </div>

                    {comment.replies && (
                      <div className="flex flex-col items-center mb-8 mx-[50px]">
                        <p className="text-left">
                          {language === "English" ? "Reply" : "Répondre"}
                        </p>
                        {comment.replies.map((reply, replyIdx) => {
                          return (
                            <div key={replyIdx}>
                              <div className="my-4 py-4 pt-1 px-[5vw] sm:px-[15vw] relative flex items-start">
                                {reply.uid ===
                                "p7KDzyiC6JMf4vnp2oEW94y92En1" ? (
                                  <img
                                    src={SafaaIcon}
                                    alt="user"
                                    className="w-10 mr-2 -mt-3 rounded-full"
                                  />
                                ) : (
                                  <img
                                    src={user}
                                    alt="user"
                                    className="w-10 mr-2 -mt-3"
                                  />
                                )}
                                <span className="font-bold ">{reply.name}</span>
                                <span>&nbsp;:</span>
                                <span className="text-gray-600 w-[55vw]">
                                  &nbsp; {reply.reply}
                                </span>
                                <span className="text-[10px] text-gray-400 absolute right-[5vw] sm:right-[15vw] bottom-1">
                                  {reply.time}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {openReplyForms[idx] && (
                      <div className=" p-4 flex flex-col items-center mb-2">
                        <h3 className="text-xl mb-4">
                          {language === "English"
                            ? "Add a reply"
                            : "Ajouter une réponse"}
                        </h3>
                        <form
                          className="flex flex-col gap-2 items-center justiy-center w-screen"
                          onSubmit={(e) => {
                            handleReplyOldBlogs(e, idx);
                          }}
                        >
                          <textarea
                            placeholder={
                              language === "English"
                                ? "Your comment"
                                : "Votre commentaire"
                            }
                            className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 h-16 w-[80vw] sm:w-[400px]"
                            value={replyComment}
                            onChange={(e) => setReplyComment(e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            placeholder={
                              language === "English"
                                ? "Your last name"
                                : "Votre nom"
                            }
                            className=" border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-[80vw] sm:w-[400px]"
                            value={replyLastName}
                            onChange={(e) => setReplyLastName(e.target.value)}
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
                    )}
                    <div className="flex justify-center -mt-4">
                      <div className="horizontal-line"></div>
                    </div>
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

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareOnLinkedIn = () => {
  // const title = encodeURIComponent("Article Title");
  // const summary = encodeURIComponent("Article Summary");
  const source = encodeURIComponent(window.location.href);
  window.open(
    `https://www.linkedin.com/shareArticle?mini=true&url=${source}`,
    "_blank"
  );
};
