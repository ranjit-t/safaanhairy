// import "./App.css";
import { NavLink, Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Contact from "./Pages/Contactpage/Contact";
import Notfound from "./Pages/Notfound";

function App() {
  return (
    <div>
      <h1 className="text-3xl bg-[#378BA4] text-white py-2 px-4">
        Safaa Nhairy
      </h1>
      <p className="bg-[#E8EDE7] py-2 px-4">
        Entrepreneurship, Communications & Leadership
      </p>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
      <p className="text-center my-2">Developed by Ranjit T</p>
    </div>
  );
}

export default App;
