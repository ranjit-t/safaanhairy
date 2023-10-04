import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../GlobalUI/PageHeader.jsx";
import Notfound from "../Notfound.jsx";
import { oldBlogs } from "../../Data/oldBlogs.js";
import TrendingBlogs from "./TrendingBlogs.jsx";

export default function Singleblog({ blogs, error, isLoading, language }) {
  const { id } = useParams();
  const pageID = id;
  const blog = blogs.find((blog) => blog.id == pageID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageID]);

  const handleAnchorClick = (event) => {
    const { target } = event;
    const href = target.getAttribute("href");

    if (href && href.startsWith("http")) {
      // If the href attribute starts with "http" (external link), open it in a new tab/window
      window.open(href, "_blank");
      event.preventDefault(); // Prevent the default behavior of the anchor tag

      // Add a CSS class to the clicked link to apply styles (font-bold and red color)
      target.classList.add("clicked-link");
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
      <div>
        <img
          src={blog.image}
          alt={`blog${id}`}
          className="w-full max-h-[550px] object-cover"
        />

        <PageHeader css="mt-16 mb-10">{blog.title}</PageHeader>

        {/* Check if blog has a videoURL and a valid YouTube video ID */}
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

        <div className="w-screen px-[10vw] pb-8 leading-8 text-justify">
          {blog.content.map((para, index) => {
            return (
              <div
                dangerouslySetInnerHTML={{ __html: para }}
                key={index}
                className="py-4"
              ></div>
            );
          })}
          <p className="text-lg font-bold mt-10 text-center">
            Article Published by Safaa Nhairy
          </p>
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
          Article Published by Safaa Nhairy
        </p>
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
