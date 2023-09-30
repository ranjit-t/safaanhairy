import React from "react";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();
  return (
    <div
      className="px-[10vw] flex flex-col gap-10 w-screen justify-center items-center pt-[30vh] text-3xl cursor-pointer"
      onClick={() => navigate("/")}
    >
      <h1>Sorry, Page Not Found!</h1>
      <p>Go Back To Homepage</p>
    </div>
  );
}
