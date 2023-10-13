import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FireBase/config";

function useUserChange() {
  const [signedUser, setSignedUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSignedUser({
          email: user.email ? user.email : "",
          uid: user.uid,
        });
      } else {
        setSignedUser(null);
      }
    });
  }, []);

  return signedUser;
}

export default useUserChange;
