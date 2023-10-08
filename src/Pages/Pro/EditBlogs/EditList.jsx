import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function EditList({ error, loading, blogs }) {
  const [search, setSearch] = useState("");

  const [pageLoading, setpageLoading] = useState(true);
  const [filteredBlogs, setFilteredBlogs] = useState(
    blogs.sort((a, b) => b.timePublished - a.timePublished)
  );

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      //
    } else {
      setFilteredBlogs(
        blogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.blogID.toString().includes(search.toString())
        )
      );
    }
  }, [blogs, search]);

  useEffect(() => {
    setTimeout(() => {
      setpageLoading(false);
    }, 500);
  }, []);
  if (pageLoading) {
    return (
      <div className="h-[70vh] w-screen flex flex-col items-center justify-center">
        ...Loading
      </div>
    );
  } else if (loading) {
    return (
      <div className="h-[70vh] w-screen flex flex-col items-center justify-center">
        ...Loading
      </div>
    );
  } else if (error) {
    return (
      <div className="h-[70vh] w-screen flex flex-col items-center justify-center">
        Sorry, there is an error
      </div>
    );
  }
  return (
    <div className="w-[90vw] mx-auto mt-8">
      <div className="flex justify-center relative">
        <input
          type="text"
          placeholder="Search a blog"
          className="border border-2 border-gray-600 px-4 py-2 rounded-full text-lg text-[25hpx] w-[250px] text-gray-700"
          onChange={handleChange}
        />
      </div>
      <div className="flex w-[80vw] justify-center mx-auto   my-4 mt-8 font-bold text-xl">
        <p className="w-[30%] ml-4">ID</p>
        <p className="w-[70%] text-center">Title</p>
      </div>
      {filteredBlogs.length === 0 && <p>Nothing Found</p>}
      {filteredBlogs.map((blog) => {
        return (
          <div
            key={blog.blogID}
            className="flex w-[80vw] justify-center mx-auto mb-4 border-b border-1 p-2 cursor-pointer"
            onClick={() => {
              navigate(`/pro-edit-blogs/${blog.blogID}`);
            }}
          >
            <p className="w-[30%]">{blog.blogID}</p>
            <p className="w-[70%] text-center">{blog.title}</p>
          </div>
        );
      })}
    </div>
  );
}
