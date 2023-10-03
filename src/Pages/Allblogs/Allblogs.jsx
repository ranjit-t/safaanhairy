import PageHeader from "../../GlobalUI/PageHeader";
import { useNavigate } from "react-router-dom";
import Notfound from "../Notfound";
import { oldBlogs } from "../../Data/oldBlogs.js";
// import { blogs } from "../../Data/blogs.js";

export default function Allblogs({ blogs, error, isLoading }) {
  const navigate = useNavigate();
  // console.log(oldBlogs);

  const englishBlogs = blogs.filter((blog) => blog.language === "English");
  const frenchBlogs = blogs.filter((blog) => blog.language === "French");

  const englishOldBlogs = oldBlogs.filter(
    (blog) => blog.language === "English"
  );
  const frenchOldBlogs = oldBlogs.filter((blog) => blog.language === "French");

  if (isLoading) {
    return (
      <div className="mt-16 flex justify-center text-center text-xl">
        <p>Loading...</p>
      </div>
    ); // Display a loading message
  }

  if (error) {
    return <Notfound />;
  }
  return (
    <div>
      <PageHeader>Blogs</PageHeader>
      <h3 className="flex  text-xl font-bold  w-[95vw] mx-auto  mt-4 ">
        Blogs in English
      </h3>
      <div className="flex  items-center   overflow-x-scroll overflow-y-hidden bg-[#F4E0B9] p-4 h-[520px] mt-4">
        {englishBlogs.map((blog, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-8 m-4  rounded-lg cursor-pointer min-w-[80vw] sm:min-w-[450px] bg-white shadow-md"
              onClick={() => {
                navigate(`/blog/${blog.blogID}`);
              }}
            >
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-xl font-bold ">{blog.title}</p>
                <p className="text-md text-gray-700 mt-4">
                  {blog.content[0].slice(0, 50)} ...
                </p>
                <img
                  src={blog.image}
                  alt=""
                  className="w-screen h-[300px] object-cover md:w-[50vw] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out"
                />
              </div>
            </div>
          );
        })}

        {englishOldBlogs.map((blog, idx) => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = blog.Content;
          const textContent = tempDiv.textContent;

          // Extract the video iframe
          const videoElement = tempDiv.querySelector("iframe");
          const imageElement = tempDiv.querySelector("img");

          const videoThumbnailURL =
            videoElement && videoElement.hasAttribute("data-thumbnail-src")
              ? videoElement.getAttribute("data-thumbnail-src")
              : "/blog.png"; //default

          return (
            <div
              key={idx}
              className="flex flex-col items-center  p-8 m-4  rounded-lg cursor-pointer min-w-[95vw] sm:min-w-[500px] bg-white shadow-md"
              onClick={() => {
                navigate(`/blog/${blog.ID}`);
              }}
            >
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-xl font-bold ">{blog.Title}</p>

                <p className="text-md text-gray-700 mt-4">
                  {textContent.slice(0, 50)} ...
                </p>
                {imageElement && (
                  <img
                    src={imageElement.src}
                    alt="Blog Image"
                    className="h-[300px] ] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out object-cover"
                  />
                )}
                {!imageElement && videoThumbnailURL && (
                  <img
                    src={videoThumbnailURL}
                    alt="Video Thumbnail"
                    className="h-[300px] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="flex  text-xl font-bold  w-[95vw] mx-auto  mt-10 mb-6">
        Blogs en français
      </h3>
      <div className="flex  items-center   overflow-x-scroll overflow-y-hidden bg-[#F4E0B9] p-4 h-[520px] mt-4">
        {frenchBlogs.map((blog, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-8 m-4  rounded-lg cursor-pointer min-w-[80vw] sm:min-w-[450px] bg-white shadow-md"
              onClick={() => {
                navigate(`/blog/${blog.blogID}`);
              }}
            >
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-xl font-bold ">{blog.title}</p>
                <p className="text-md text-gray-700 mt-4">
                  {blog.content[0].slice(0, 50)} ...
                </p>
                <img
                  src={blog.image}
                  alt=""
                  className="w-screen h-[300px] object-cover md:w-[50vw] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out"
                />
              </div>
            </div>
          );
        })}
        {frenchOldBlogs.map((blog, idx) => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = blog.Content;
          const textContent = tempDiv.textContent;

          // Extract the video iframe
          const videoElement = tempDiv.querySelector("iframe");
          const imageElement = tempDiv.querySelector("img");

          const videoThumbnailURL =
            videoElement && videoElement.hasAttribute("data-thumbnail-src")
              ? videoElement.getAttribute("data-thumbnail-src")
              : "/blog.png"; //default

          return (
            <div
              key={idx}
              className="flex flex-col items-center  p-8 m-4  rounded-lg cursor-pointer min-w-[95vw] sm:min-w-[500px] bg-white shadow-md"
              onClick={() => {
                navigate(`/blog/${blog.ID}`);
              }}
            >
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-xl font-bold ">{blog.Title}</p>

                <p className="text-md text-gray-700 mt-4">
                  {textContent.slice(0, 50)} ...
                </p>
                {imageElement && (
                  <img
                    src={imageElement.src}
                    alt="Blog Image"
                    className="h-[300px] ] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out object-cover"
                  />
                )}
                {!imageElement && videoThumbnailURL && (
                  <img
                    src={videoThumbnailURL}
                    alt="Video Thumbnail"
                    className="h-[300px] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
