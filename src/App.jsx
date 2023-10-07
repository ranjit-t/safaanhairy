import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Contact from "./Pages/Contactpage/Contact";
import Notfound from "./Pages/Notfound";
import "./App.css";
import Allblogs from "./Pages/Allblogs/Allblogs";
import Singleblog from "./Pages/Singleblog/Singleblog";
import NewBlog from "./Pages/NewBlog/NewBlog";
import useFetchBlogs from "./Util/Hooks/useFetchBlogs";
import { useEffect, useState } from "react";
import ChooseLang from "./Pages/ChooseLang";
import AllblogsFr from "./Pages/Allblogs/AllBlogsFr";
import ContactFr from "./Pages/Contactpage/ContactFr";
import HomepageFr from "./Pages/HomepageFr/HomepageFr";
import useFetchOldBlogs from "./Util/Hooks/useFetchOldBlogs";
import uk from "./Images/uk.png";
import fr from "./Images/fr.png";
import BlogPreview from "./Pages/NewBlog/BlogPreview";

function App() {
  const { blogs, loading, error } = useFetchBlogs();
  const { oldBlogsFireStore } = useFetchOldBlogs();

  const isFrench = window.location.pathname.startsWith("/fr");
  const isEnglish = window.location.pathname.startsWith("/en");

  let initialLanguage;
  if (isFrench) {
    initialLanguage = "French";
  } else if (isEnglish) {
    initialLanguage = "English";
  } else if (localStorage.getItem("Safaa-Nhairy-Site-Language")) {
    initialLanguage = JSON.parse(
      localStorage.getItem("Safaa-Nhairy-Site-Language")
    );
  } else {
    location.href = "/";
  }

  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    localStorage.removeItem("Safaa-Nhairy-Site-Language");
    localStorage.setItem(
      "Safaa-Nhairy-Site-Language",
      JSON.stringify(language)
    );
  }, [language]);

  const handleLanguageChange = (lang) => {
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem("Safaa-Nhairy-Site-Language", JSON.stringify(lang));

      const currentPath = window.location.pathname;
      let newPath = currentPath;

      if (currentPath.startsWith("/en") && lang === "French") {
        newPath = currentPath.replace("/en", "/fr");
      } else if (currentPath.startsWith("/fr") && lang === "English") {
        newPath = currentPath.replace("/fr", "/en");
      }

      // Navigate to the new path
      location.href = newPath;
    }
  };

  return (
    <div className="relative min-h-screen">
      <BrowserRouter>
        <div className="flex items-center  ">
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

          <div className="flex items-center mr-2">
            <NavLink
              className="nav-link"
              to={language === "English" ? "/en/blogs" : "/fr/blogs"}
            >
              Blogs
            </NavLink>
            <NavLink
              className="nav-link"
              to={language === "English" ? "/en/contact" : "/fr/contact"}
            >
              Contact
            </NavLink>
          </div>
        </div>
        <div className="w-screen flex justify-between shadow-md">
          <p className="py-2 px-6 text-[12px] sm:text-[16px] mb-2 -mt-4">
            Entrepreneurship, Communications & Leadership
          </p>
          <div className="ml-4 mr-4 ">
            {language === "French" ? (
              <img
                src={uk}
                alt="EN"
                className="w-[30px]  cursor-pointer"
                onClick={() => {
                  handleLanguageChange("English");
                }}
              />
            ) : (
              <img
                src={fr}
                alt="FR"
                className="w-[30px]  cursor-pointer"
                onClick={() => {
                  handleLanguageChange("French");
                }}
              />
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<ChooseLang setLanguage={setLanguage} />} />
          <Route path="/en" element={<Homepage />} />
          <Route path="/fr" element={<HomepageFr />} />
          <Route path="/en/contact" element={<Contact />} />
          <Route path="/fr/contact" element={<ContactFr />} />
          <Route path="/publish-article" element={<NewBlog />} />
          {/* <Route path="/blog-preview" element={<BlogPreview />} /> */}
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
                oldBlogsFireStore={oldBlogsFireStore}
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
