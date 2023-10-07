import React from "react";
import Thami from "../../Images/thami.jpg";
import John from "../../Images/John.jpg";
import Woman from "../../Images/Woman1.png";
import Man3 from "../../Images/Man3.jpg";
import Man4 from "../../Images/Man4.png";
import Hapsatou from "../../Images/Hapsatou.jpeg";
import Yannick from "../../Images/Yannick.jpeg";

export default function PhotoGallery() {
  return (
    <div className="bg-[#F4E0B9] py-16 w-full  box-design">
      <h2 className="text-5xl text-center mb-16">
        Life is who you spend time with...
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-4   w-screen px-[15vw]">
        {[
          { src: Thami, alt: "Thami Kabbaj" },
          { src: John, alt: "John Purkiss" },
          { src: Woman, alt: "Carrie Green" },
          { src: Man3, alt: "Paolo Coelho" },
          { src: Man4, alt: "Rom Moore" },
          { src: Hapsatou, alt: "Hapsatou Sy" },
          { src: Yannick, alt: "Yannick Noah" },
        ].map((image, index) => (
          <div
            key={index}
            className={
              image.src === Yannick
                ? "relative group w-128 h-64 overflow-hidden rounded-lg"
                : "relative group w-64 h-64 overflow-hidden rounded-lg"
            }
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full transition-transform transform scale-100 group-hover:scale-105 duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-semibold">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
