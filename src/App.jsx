import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Contact from "./Pages/Contactpage/Contact";
import Notfound from "./Pages/Notfound";
import "./App.css";
import Allblogs from "./Pages/Allblogs/Allblogs";
import Singleblog from "./Pages/Singleblog/Singleblog";
import NewBlog from "./Pages/NewBlog/NewBlog";
import useFetchBlogs from "./Util/Hooks/useFetchBlogs";
import { useState } from "react";
import ChooseLang from "./Pages/ChooseLang";
import AllblogsFr from "./Pages/Allblogs/AllBlogsFr";
import ContactFr from "./Pages/Contactpage/ContactFr";
import HomepageFr from "./Pages/HomepageFr/HomepageFr";
import uk from "./Images/uk.png";
import fr from "./Images/fr.png";

function App() {
  const { blogs, loading, error } = useFetchBlogs();

  const initialLanguage = location.pathname.startsWith("/fr")
    ? "French"
    : "English";

  const [language, setLanguage] = useState(initialLanguage);

  // Function to handle language change
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    // Get the current pathname
    const currentPath = window.location.pathname;

    // Determine the new path based on the selected language
    let newPath = currentPath;
    if (currentPath.startsWith("/en") && selectedLanguage === "French") {
      newPath = currentPath.replace("/en", "/fr");
    } else if (
      currentPath.startsWith("/fr") &&
      selectedLanguage === "English"
    ) {
      newPath = currentPath.replace("/fr", "/en");
    }

    // Navigate to the new path
    location.href = newPath;
  };

  return (
    <div className="relative min-h-screen">
      <BrowserRouter>
        <div className="flex items-center  shadow-md">
          <div className="w-full py-4 px-6">
            <img
              src="/SafaaLogo.jpeg"
              alt="Logo"
              className="min-w-[100px] max-w-[100px] sm:max-w-[180px] cursor-pointer "
              onClick={() =>
                (location.href = language === "English" ? "/en" : "/fr")
              }
            />
          </div>
          <div className="flex nav-bar-in-header">
            <NavLink
              className="nav-link"
              to={language === "English" ? "/en/contact" : "/fr/contact"}
            >
              Contact
            </NavLink>
            <NavLink
              className="nav-link"
              to={language === "English" ? "/en/blogs" : "/fr/blogs"}
            >
              Blogs
            </NavLink>
            <div className="ml-4">
              <select value={language} onChange={handleLanguageChange}>
                <option value="English">En 🇬🇧</option>
                <option value="French">Fr 🇫🇷</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="py-2 px-6 text-[12px] sm:text-[16px]">
            Entrepreneurship, Communications & Leadership
          </p>
          <hr />
        </div>
        <Routes>
          <Route path="/" element={<ChooseLang setLanguage={setLanguage} />} />
          <Route path="/en" element={<Homepage />} />
          <Route path="/fr" element={<HomepageFr />} />
          <Route path="/en/contact" element={<Contact />} />
          <Route path="/fr/contact" element={<ContactFr />} />
          <Route path="/publish-article" element={<NewBlog />} />
          <Route
            path="/en/blogs"
            element={
              <Allblogs blogs={blogs} error={error} isLoading={loading} />
            }
          />
          <Route
            path="/fr/blogs"
            element={
              <AllblogsFr blogs={blogs} error={error} isLoading={loading} />
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Singleblog
                blogs={blogs}
                error={error}
                isLoading={loading}
                language={language}
              />
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
