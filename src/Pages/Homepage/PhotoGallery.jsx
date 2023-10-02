import React from "react";
import Thami from "../../Images/thami.jpg";
import John from "../../Images/John.jpg";
import Woman from "../../Images/Woman1.png";
import Man3 from "../../Images/Man3.jpg";
import Man4 from "../../Images/Man4.png";

export default function PhotoGallery() {
  return (
    <div className="bg-[#F4E0B9] py-16 w-full">
      <h2 className="text-5xl text-center mb-16">
        Life is who you spend time with...
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-4   w-screen px-[15vw]">
        {[
          { src: Thami, alt: "Thami" },
          { src: John, alt: "John" },
          { src: Woman, alt: "John" },
          { src: Man3, alt: "John" },
          { src: Man4, alt: "John" },
        ].map((image, index) => (
          <div
            key={index}
            className="relative group w-64 h-64 overflow-hidden rounded-lg"
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
