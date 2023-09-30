import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Contact from "./Pages/Contactpage/Contact";
import Notfound from "./Pages/Notfound";
import "./App.css";
import Allblogs from "./Pages/Allblogs/Allblogs";
import Singleblog from "./Pages/Singleblog/Singleblog";
import { useFetch } from "./Util/Hooks/useFetch";

function App() {
  const { isLoading, error, blogs } = useFetch(
    "https://test.aveyronici.com/Data/blogs.json"
  );

  return (
    <div className="relative min-h-screen">
      <BrowserRouter>
        <div className="flex items-center shadow-md">
          <div className="w-full py-4 px-6">
            <NavLink
              className="text-xl sm:text-2xl font-bold cursor-pointer"
              to="/"
            >
              Safaa Nhairy
            </NavLink>
          </div>
          <div className="nav-bar-in-header">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
            <NavLink className="nav-link" to="/blogs">
              Blogs
            </NavLink>
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
          <Route
            path="/blogs"
            element={
              <Allblogs blogs={blogs} error={error} isLoading={isLoading} />
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Singleblog blogs={blogs} error={error} isLoading={isLoading} />
            }
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
      <div className="flex justify-center my-2 mt-8">
        <p className="text-center absolute bottom-0">Developed by Ranjit T</p>
      </div>
    </div>
  );
}

export default App;
