import React from "react";
import Book from "../../Images/Book.png";
import Portrait from "../../Images/Portrait.png";
import PhotoGallery from "./PhotoGallery";
import VideoIntro from "./VideoIntro";
import Form from "./Form.Jsx";
import AsSeenIn from "./AsSeenIn";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center w-screen">
      <img src={Book} alt="Vivre De Sa Passion" className="w-full" />
      <div className="bg-[#F4E0B9]  text-lg  flex flex-col md:flex-row items-center justify-evenly  w-screen px-[10vw] py-10 gap-6">
        <div className="max-w-[400px]">
          <img src={Portrait} alt="Portait" />
        </div>
        <div className="max-w-[450px]">
          <p>Hey,</p>
          <p className="my-6 mt-4">
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
      <div className="my-10">
        {" "}
        <h1 className="text-4xl font-bold text-center mb-10 specialFont">
          Courses
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-evenly md:gap-16 px-[10vw] ">
          <div className="max-w-[450px]">
            <p className="">
              SN School is an online learning platform for people looking to
              achieve Success Now!!
            </p>
            <p>
              Whether you need to develop and improve your skills in marketing,
              communication and project management or you need help creating
              that business you have in mind, we will have a course that will
              help you go from where you are to where you want to be.
            </p>
            <button className="bg-black text-white w-1/2 mt-6 py-2 px-4">
              Learn More{" "}
            </button>
          </div>

          <div className="md:min-w-[50%]">
            <iframe
              title="Course Video"
              src="https://player.vimeo.com/video/333603516?h=f2435371d0"
              className="w-full h-64"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <PhotoGallery />
      <VideoIntro />
      <AsSeenIn />
      <Form />
    </div>
  );
}
