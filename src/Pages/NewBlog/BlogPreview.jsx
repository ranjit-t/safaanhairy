// BlogPreview.js
import React from "react";
import PageHeader from "../../GlobalUI/PageHeader";

const BlogPreview = ({ blog, closePreview }) => {
  const youtubeVideoID = extractYoutubeVideoID(blog.videoURL);

  console.log(blog);

  return (
    <div className="absolute top-0  bg-transparent w-full bg-gray-200 py-10 mb-24">
      <div className="bg-white  flex flex-col mx-auto items-center py-6">
        <div className="flex justify-center ">
          <img
            src={URL.createObjectURL(blog.image)}
            alt={`blog${blog.blogID}`}
            className="max-h-[550px] object-cover"
          />
        </div>

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
          {/* {blog.content.map((para, index) => {
            return (
              <div
                dangerouslySetInnerHTML={{ __html: para }}
                key={index}
                className="py-4"
              ></div>
            );
          })} */}
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="py-4"
          ></div>
          <p className="text-lg font-bold mt-10 text-center">
            {blog.language === "English"
              ? "Article Published by Safaa Nhairy"
              : "Article publié par Safaa Nhairy"}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 px-4 py-2 text-white"
            onClick={closePreview}
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

// Function to extract YouTube video ID from a YouTube video URL
function extractYoutubeVideoID(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1];
}

export default BlogPreview;
