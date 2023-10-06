import PageHeader from "../../GlobalUI/PageHeader";
import { useNavigate } from "react-router-dom";
import Notfound from "../Notfound";
import { oldBlogs } from "../../Data/oldBlogs.js";
import { useEffect, useState } from "react";
import uparrow from "../../Images/uparrow.svg";

export default function AllblogsFr({ blogs, error, isLoading }) {
  const navigate = useNavigate();

  const englishBlogs = blogs
    .filter((blog) => blog.language === "French")
    .sort((a, b) => b.timePublished - a.timePublished);

  const englishOldBlogs = oldBlogs.filter((blog) => blog.language === "French");

  const [search, setSearch] = useState("");
  const [filteredOldBlogs, setFilteredOldBlogs] = useState(englishOldBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState(englishBlogs);

  const [timeDelay, settimeDelay] = useState(true);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      settimeDelay(false);
    }, 500);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Check if the blogs data is available
    if (!blogs || blogs.length === 0) {
      //
    } else {
      // Data is available, filter and set it
      setFilteredOldBlogs(
        englishOldBlogs.filter((blog) =>
          blog.Title.toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilteredBlogs(
        englishBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [blogs, search]);

  if (timeDelay) {
    return (
      <div className="mt-16 flex justify-center text-center text-xl">
        <p>Chargement...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-16 flex justify-center text-center text-xl">
        <p>Chargement...</p>
      </div>
    );
  }
  if (error) {
    return <Notfound />;
  }

  return (
    <div>
      <PageHeader>Blogs</PageHeader>
      <div className="flex justify-center mt-4 relative">
        <input
          type="text"
          placeholder="rechercher un blog"
          className="border border-1 border-gray-600 px-4 py-1 rounded-full text-lg w-[200px] text-gray-700"
          onChange={handleChange}
        />
      </div>
      <div
        className="fixed bottom-[5vh] right-[1vw] sm:right-[3vw] bg-white p-2 rounded-full cursor-pointer shadow-lg z-60"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img src={uparrow} alt="UP" className=" w-8 sm:w-10" />
      </div>
      <div className="flex  items-center justify-center flex-wrap  bg-[#F4E0B9] p-4 mt-4 min-h-[550px]">
        {filteredBlogs.length === 0 && filteredOldBlogs.length === 0 && (
          <p>Désolé, rien trouvé</p>
        )}

        {filteredBlogs.map((blog, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-8 m-4  rounded-lg cursor-pointer w-[80vw] sm:w-[480px] bg-white shadow-md h-[450px]"
              onClick={() => {
                navigate(`/blog/${blog.blogID}`);
              }}
            >
              <div className="w-full flex flex-col items-center justify-center text-center">
                <p className="text-xl font-bold truncate w-[90%] ">
                  {blog.title}
                </p>
                <p
                  className="text-md text-gray-700 mt-4 truncate w-[90%] "
                  dangerouslySetInnerHTML={{ __html: blog.content[0] }}
                ></p>
                <img
                  src={blog.image}
                  alt=""
                  className="w-screen h-[300px] object-cover md:w-[50vw] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out"
                />
              </div>
            </div>
          );
        })}

        {filteredOldBlogs.map((blog, idx) => {
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
              className="flex flex-col items-center justify-center p-8 m-4  rounded-lg cursor-pointer w-[80vw] sm:w-[480px] bg-white shadow-md  h-[450px]"
              onClick={() => {
                navigate(`/blog/${blog.ID}`);
              }}
            >
              <div className="w-full flex flex-col items-center justify-center text-center">
                <p className="text-xl font-bold truncate w-[90%]">
                  {blog.Title}
                </p>

                <p
                  className="text-md text-gray-700 mt-4 truncate w-[90%] "
                  dangerouslySetInnerHTML={{ __html: textContent }}
                ></p>
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
