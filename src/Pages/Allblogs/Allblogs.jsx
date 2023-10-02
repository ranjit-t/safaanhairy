import PageHeader from "../../GlobalUI/PageHeader";
import { useNavigate } from "react-router-dom";
import Notfound from "../Notfound";
import { oldBlogs } from "../../Data/oldBlogs.js";
// import { blogs } from "../../Data/blogs.js";

export default function Allblogs({ blogs, error, isLoading }) {
  const navigate = useNavigate();

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
      <div className="flex  flex-wrap items-center justify-center w-screen mt-6">
        {blogs.map((blog, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-8 m-4 border border-1 border-black rounded-lg cursor-pointer w-[90vw] sm:w-[40vw]"
              onClick={() => {
                navigate(`/blog/${blog.blogID}`);
              }}
            >
              <div className="">
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

        {oldBlogs.map((blog, idx) => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = blog.Content;
          const textContent = tempDiv.textContent;

          // Extract the video iframe
          const videoElement = tempDiv.querySelector("iframe");
          // console.log(videoElement);
          const imageElement = tempDiv.querySelector("img");

          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-8 m-4 border border-1 border-black rounded-lg cursor-pointer w-[90vw] sm:w-[40vw]"
              onClick={() => {
                navigate(`/blog/${blog.ID}`);
              }}
            >
              <div className="">
                <p className="text-xl font-bold ">{blog.Title}</p>
                {/* {videoElement && (
                  <div
                    className="text-center"
                    dangerouslySetInnerHTML={{ __html: videoElement.outerHTML }}
                  ></div>
                )} */}
                <p className="text-md text-gray-700 mt-4">
                  {textContent.slice(0, 50)} ...
                </p>
                {imageElement && (
                  <img
                    src={imageElement.src}
                    alt="Blog Image"
                    className="w-screen h-[300px] md:w-[50vw] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out object-cover"
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
