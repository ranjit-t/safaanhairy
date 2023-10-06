import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ChooseLang({ setLanguage }) {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const greetings = ["Hello", "Bonjour"];
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  useEffect(() => {
    const currentGreeting = greetings[currentGreetingIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentGreeting.length) {
        setGreeting(currentGreeting.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          if (currentGreetingIndex === greetings.length - 1) {
            setCurrentGreetingIndex(0);
          } else {
            setCurrentGreetingIndex(currentGreetingIndex + 1);
          }
          setGreeting(""); // Clear the text
        }, 1000); // Wait for 1 second before switching to the next greeting
      }
    }, 100); // Adjust typing speed as needed

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentGreetingIndex]);

  return (
    <div className="w-screen h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">{greeting}</h2>
      <div className="fixed justify-center items-center flex flex-col mt-40">
        <p className="mt-8">Choose your language</p>
        <p className="mb-8">(Choisissez votre langue)</p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setLanguage("English");

              navigate("/en");
            }}
            className="bg-[#F4E0B9]  hover:scale-105 rounded-full px-4 py-2"
          >
            English 🇬🇧
          </button>
          <button
            onClick={() => {
              setLanguage("French");

              navigate("/fr");
            }}
            className="bg-[#F4E0B9] hover:scale-105 rounded-full px-4 py-2"
          >
            Français 🇫🇷
          </button>
        </div>
      </div>
    </div>
  );
}
