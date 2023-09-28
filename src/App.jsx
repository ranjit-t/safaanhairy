// import "./App.css";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Contact from "./Pages/Contactpage/Contact";
import Notfound from "./Pages/Notfound";
import "./App.css";

function App() {
  return (
    <div>
      <div className="w-full shadow-md ">
        <h1 className="text-3xl font-bold  py-4 px-6  bg-[#E8EDE7]">
          Safaa Nhairy
        </h1>
      </div>
      <div className="w-full shadow-md">
        <p className=" py-2 px-6 text-[12px] sm:text-[16px] ">
          Entrepreneurship, Communications & Leadership
        </p>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
      <p className="text-center my-2 mt-10">Developed by Ranjit T</p>
    </div>
  );
}

export default App;
