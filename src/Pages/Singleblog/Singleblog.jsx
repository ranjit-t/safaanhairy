import { useParams } from "react-router-dom";
import PageHeader from "../../GlobalUI/PageHeader.jsx";
import Notfound from "../Notfound.jsx";
import { oldBlogs } from "../../Data/oldBlogs.js";
import { transformBlogObject } from "../../Util/JSFuncs/TransformBlog.js";

export default function Singleblog({ blogs, error, isLoading }) {
  const { id } = useParams();

  const blog = blogs.find((blog) => blog.blogID == id);

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

    return (
      <div>
        <img
          src={blog.image}
          alt={`blog${id}`}
          className="w-full max-h-[550px] object-cover"
        />

        <PageHeader css="mt-16">{blog.title}</PageHeader>
        <div className="w-screen px-[10vw] py-8 leading-8 text-justify">
          {blog.content.map((para, index) => {
            return (
              <p key={index} className="py-4">
                {para}
              </p>
            );
          })}
          <p className="text-lg font-bold mt-10 text-center">
            Article Published by Safaa Nhairy
          </p>
        </div>
      </div>
    );
  }

  const oldBlog = oldBlogs.find((oldBlog) => oldBlog.ID == id);
  const oldtoNewBlog = transformBlogObject(oldBlog);

  if (oldBlog) {
    return (
      <div className="">
        <PageHeader css="mt-16">{oldtoNewBlog.title}</PageHeader>
        <div className="w-screen px-[10vw] pt-8 leading-8 text-justify flex justify-center oldBlog">
          <div dangerouslySetInnerHTML={{ __html: oldBlog.Content }} />
        </div>
        <p className="text-lg font-bold mt-4 text-center">
          Article Published by Safaa Nhairy
        </p>
      </div>
    );
  }
}
