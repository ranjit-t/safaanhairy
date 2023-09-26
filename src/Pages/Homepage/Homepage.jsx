import React from "react";
import Book from "../../Images/Book.png";
import Portrait from "../../Images/Portrait.png";
import PhotoGallery from "./PhotoGallery";
import VideoIntro from "./VideoIntro";
import Form from "./Form.Jsx";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center w-screen">
      <img src={Book} alt="Vivre De Sa Passion" />
      <div className="bg-[#81BECE]  flex flex-col md:flex-row items-center justify-center w-full">
        <img
          src={Portrait}
          alt="Portait"
          className="md:w-[50%] md:max-w-[500px] p-4 -ml-[3vw]"
        />
        <div className="md:w-[50%] max-w-[450px] py-8 md:py-0 px-8">
          <p>Hey,</p>
          <p className="py-4">
            I am Safaa Nhairy. Ever since I can remember, I have always been
            passionate about communications and creating and building projects.
            Today, we call that ‘entrepreneurship’. I am also driven by the love
            for sharing and contributing. I teach and train aspiring
            entrepreneurs to design a successful career path and business.
            Welcome to this space!
          </p>
          <p className="text-2xl font-bold">
            Safaa Nhairy - Entrepreneur Guide
          </p>
        </div>
      </div>

      {/* Courses  */}
      <h1 className="text-4xl font-bold mt-16">Courses</h1>
      <div className=" flex flex-col md:flex-row items-center justify-center w-full p-8 gap-4">
        <div className="md:w-[50%] max-w-[450px] flex flex-col gap-2 ">
          <p className="pb-4 text-2xl font-bold">
            SN School is an online learning platform for people looking to
            achieve Success Now!!
          </p>
          <p>
            Whether you need to develop and improve your skills in marketing,
            communication and project management or you need help creating that
            business you have in mind, we will have a course that will help you
            go from where you are to where you want to be.
          </p>
          <button className="bg-black text-white w-1/2">Learn More </button>
        </div>

        <div className="w-[90%] md:w-[50%] md:max-w-[500px]">
          <iframe
            title="Course Video"
            src="https://www.youtube.com/embed/video-id"
            className="w-full h-64"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <PhotoGallery />
      <VideoIntro />
      <Form />
    </div>
  );
}
