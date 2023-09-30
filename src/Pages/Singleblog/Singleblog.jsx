import { useParams } from "react-router-dom";
import PageHeader from "../../GlobalUI/PageHeader.jsx";
import Notfound from "../Notfound.jsx";

export default function Singleblog({ blogs, error, isLoading }) {
  const { id } = useParams();

  const blog = blogs.find((blog) => blog.blogID == id);

  const imageSrc = `/BlogImages/blog${id}.jpg`;

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
      <img src={imageSrc} alt={`blog${id}`} className="w-full" />
      <PageHeader css="mt-16">{blog.title}</PageHeader>
      <div className="w-screen px-[10vw] py-8 leading-8 text-justify">
        {blog.content.map((para, index) => {
          return (
            <p key={index} className="py-4">
              {para}
            </p>
          );
        })}
      </div>
    </div>
  );
}
