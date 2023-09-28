import React from "react";
import Safaa from "../../Images/safaaIcon.jpeg";

export default function VideoIntro() {
  return (
    <div className="bg-gradient-to-r from-[#EDE1CF] to-[#E8EDE7] my-8 py-8 gap-8 flex flex-col items-center w-full">
      <h1 className="text-2xl font-[700] specialFont">The World Needs You</h1>

      <div className="w-[90%] md:w-[50%] md:max-w-[500px] border border-[12px] border-white rounded-lg">
        <iframe
          title="Course Video"
          src="https://www.youtube.com/embed/N29AXj9vCV4"
          className="w-full h-64"
          allowFullScreen
        ></iframe>
      </div>
      <p className="max-w-[650px] text-center font-[600]">
        ‘Every action you make and every decision you take has an impact on
        yourself and on people around. When you acknowledge that, you instantly
        become powerful.’​
      </p>
      <div className="flex flex-col items-center">
        <img src={Safaa} alt="Safaa" className="w-20 rounded-full" />
        <p className="font-bold mt-4 text-xl">Safaa Nhairy</p>
      </div>
    </div>
  );
}
