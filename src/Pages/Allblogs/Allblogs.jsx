import PageHeader from "../../GlobalUI/PageHeader";
import { useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

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
                <p className="text-xl font-bold">{blog.title}</p>
                <p className="text-md text-gray-700 mt-4">
                  {blog.content[0].slice(0, 50)} ...
                </p>
                <img
                  src={`/BlogImages/blog${blog.blogID}.jpg`}
                  alt=""
                  className="w-screen h-[200px] md:w-[50vw] mt-4 transform scale-95 hover:scale-100 transition-transform duration-300 ease-in-out"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
