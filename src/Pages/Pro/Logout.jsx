import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../FireBase/config";

export default function Logout() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        signOut(auth)
          .then(() => {
            navigate("/en");
          })
          .catch((error) => {
            // An error happened.
          });
      }}
    >
      <p>Logout</p>
    </div>
  );
}
