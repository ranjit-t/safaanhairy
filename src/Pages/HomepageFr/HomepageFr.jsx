import React from "react";
import Book from "../../Images/Book.png";
import Portrait from "../../Images/Portrait.png";
import PhotoGallery from "./PhotoGallery";
import VideoIntro from "./VideoIntro";
import Form from "./Form.Jsx";
import AsSeenIn from "./AsSeenIn";

export default function HomepageFr() {
  return (
    <div className="flex flex-col items-center w-screen">
      <img src={Book} alt="Vivre De Sa Passion" className="w-full" />
      <div className="bg-[#F4E0B9]  text-lg  flex flex-col md:flex-row items-center justify-evenly  w-screen px-[10vw] py-10 gap-6">
        <div className="max-w-[400px]">
          <img src={Portrait} alt="Portait" />
        </div>
        <div className="max-w-[450px]">
          <p>Bonjour,</p>
          <p className="my-6 mt-4">
            Je m'appelle Safaa Nhairy. Depuis que je suis tout petit, j'ai
            toujours été passionné par la communication, la création et la
            réalisation de projets. Aujourd'hui, nous appelons cela
            "l'entrepreneuriat". Je suis également animé par l'amour du partage
            et de la contribution. J'enseigne et forme les aspirants
            entrepreneurs à concevoir un parcours professionnel et une
            entreprise prospères. Bienvenue dans cet espace !
          </p>
          <p className="text-2xl font-bold">
            Safaa Nhairy - Guide de l'Entrepreneur
          </p>
        </div>
      </div>

      {/* Courses  */}
      <div className="my-10">
        {" "}
        <h1 className="text-4xl font-bold text-center mb-10 specialFont">
          Cours
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-evenly md:gap-16 px-[10vw] ">
          <div className="max-w-[450px]">
            <p className="">
              L'école SN est une plateforme d'apprentissage en ligne pour les
              personnes cherchant à réussir dès maintenant !!
            </p>
            <p>
              Que vous ayez besoin de développer et d'améliorer vos compétences
              en marketing, communication et gestion de projet, ou que vous ayez
              besoin d'aide pour créer cette entreprise que vous avez en tête,
              nous aurons un cours qui vous aidera à passer de là où vous êtes à
              là où vous voulez être.
            </p>
            <button className="bg-black text-white w-1/2 mt-6 py-2 px-4">
              En savoir plus{" "}
            </button>
          </div>

          <div className="md:min-w-[50%]">
            <iframe
              title="Vidéo de cours"
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
