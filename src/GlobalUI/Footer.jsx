import React from "react";
import Linkedin from "../Images/linkedin.png";
import Insta from "../Images/instagram.png";
import YT from "../Images/youtube.png";
import FB from "../Images/facebook.png";

export default function Footer() {
  return (
    <div className="bg-black text-gray-300 py-4 absolute -bottom-40 ">
      <div className="flex  w-screen justify-center items-center gap-8 flex-wrap my-4 text-sm opacity-60">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <img src={Linkedin} alt="LinkedIn" className="w-8" />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <img src={FB} alt="Facebook" className="w-8" />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <img src={Insta} alt="Instagram" className="w-8" />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <img src={YT} alt="Youtube" className="w-10" />
        </a>
      </div>
      <p className="text-center my-4 opacity-60">© Safaa Nhairy - 2023</p>
      <p className="text-center opacity-60">
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center  text-[12px]"
        >
          Developed by Ranjit T
        </a>
      </p>
    </div>
  );
}
