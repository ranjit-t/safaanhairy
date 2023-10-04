import React from "react";

export default function Form() {
  return (
    <div className="bg-[#F4E0B9] p-10 text-center w-screen px-[10vw] ">
      <h2 className="text-3xl font-bold mb-4 ">Rejoignez notre communauté !</h2>
      <p className="mb-4">
        Abonnez-vous à notre newsletter et ne manquez jamais une mise à jour de
        notre part !
      </p>
      <form>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Prénom"
            className="border p-2 w-full max-w-[400px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nom"
            className="border p-2 w-full max-w-[400px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full max-w-[400px]"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          S'abonner
        </button>
      </form>
    </div>
  );
}
