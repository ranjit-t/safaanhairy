import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Contact from "./Pages/Contactpage/Contact";
import Notfound from "./Pages/Notfound";
import "./App.css";
import Allblogs from "./Pages/Allblogs/Allblogs";
import Singleblog from "./Pages/Singleblog/Singleblog";
import NewBlog from "./Pages/NewBlog/NewBlog";
import useFetchBlogs from "./Util/Hooks/useFetchBlogs";

function App() {
  const { blogs, loading, error } = useFetchBlogs();

  return (
    <div className="relative min-h-screen">
      <BrowserRouter>
        <div className="flex items-center shadow-md">
          <div className="w-full py-4 px-6">
            <img
              src="/SafaaLogo.jpeg"
              alt="Logo"
              className="min-w-[100px] max-w-[100px] sm:max-w-[180px] cursor-pointer "
              onClick={() => (location.href = "/")}
            />
          </div>
          <div className="nav-bar-in-header">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
            <NavLink className="nav-link" to="/blogs">
              Blogs
            </NavLink>
            {/* <NavLink className="nav-link" to="/publish-article">
              Publish
            </NavLink> */}
          </div>
        </div>
        <div className="w-full">
          <p className="py-2 px-6 text-[12px] sm:text-[16px]">
            Entrepreneurship, Communications & Leadership
          </p>
          <hr />
        </div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/publish-article" element={<NewBlog />} />
          <Route
            path="/blogs"
            element={
              <Allblogs blogs={blogs} error={error} isLoading={loading} />
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Singleblog blogs={blogs} error={error} isLoading={loading} />
            }
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
      <div className="flex justify-center  mt-14">
        <p className="text-center absolute bottom-4 text-[12px]">
          Developed by Ranjit T
        </p>
      </div>
    </div>
  );
}

export default App;
