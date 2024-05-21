import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import VistaAdmin from "../componentes/VistaAdmin";
import VistaUser from "../componentes/VistaUser";
import { auth } from "../bd/firebase";

const Home = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setUserRole("user");
      } else {
       
        setUserRole("");
      }
    });

    
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {userRole === "admin" ? <VistaAdmin /> : <VistaUser />}
    </div>
  );
}

export default Home;
