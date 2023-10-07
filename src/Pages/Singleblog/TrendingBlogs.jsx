import React from "react";
import { useNavigate } from "react-router-dom";

export default function TrendingBlogs({ blogs, language }) {
  const trendingBlogs = blogs.filter((blog) => blog.trending === "true");

  const navigate = useNavigate();

  return (
    <div>
      <h3 className="flex  text-2xl font-bold  w-[95vw] mx-auto  mt-4 ">
        {language === "English"
          ? "You might also like"
          : "Vous pourriez aussi aimer"}
      </h3>
      <div className="flex  items-center   overflow-x-scroll overflow-y-hidden bg-[#F4E0B9] p-4 h-[500px] mt-4">
        {trendingBlogs.map((blog, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-8 m-4  rounded-lg cursor-pointer min-w-[80vw] sm:min-w-[450px] bg-white shadow-md h-[350px]  w-[80vw] sm:w-[450px]"
              onClick={() => {
                navigate(`/blog/${blog.blogID}`);
              }}
            >
              <div className="w-full flex flex-col items-center justify-center">
                <p className="text-xl font-bold ">{blog.title}</p>
                <p className="text-md text-gray-700 mt-4 truncate  w-[45vw] sm:w-[300px]">
                  {htmlToPlainText(blog.content)}
                </p>
                <img
                  src={blog.image}
                  alt=""
                  className="w-screen h-[180px] object-cover md:w-[50vw] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function htmlToPlainText(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}
