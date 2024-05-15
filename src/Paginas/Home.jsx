import React from "react";
import VistaAdmin from "../componentes/VistaAdmin";
import VistaUser from "../componentes/VistaUser";




const Home = ({ userRole }) => {
  return (
    <div>
      {userRole === 'admin' ? <VistaAdmin /> : <VistaUser />}
    </div>
  );
}


export default Home;