import React from "react";

export default function Form() {
  return (
    <div className="bg-[#E8EDE7] p-10 text-center w-screen px-[10vw] ">
      <h2 className="text-3xl font-bold mb-4 ">Join Our Community!</h2>
      <p className="mb-4">
        Subscribe to my newsletter and never miss an update from me!
      </p>
      <form>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="border p-2 w-full max-w-[400px]"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
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
          Subscribe
        </button>
      </form>
    </div>
  );
}
