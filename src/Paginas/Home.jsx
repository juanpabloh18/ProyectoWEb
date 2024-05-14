// Home.js
import React from "react";
import NavbarAdmin from "../assets/componentes/NavbarAdmin";
import NavbarUser from "../assets/componentes/NavbarUser";

const Home = ({ isAdmin }) => {
    return (
        <div>
            
            {isAdmin ? <NavbarUser /> : <NavbarAdmin />}
            
        </div>
    );
}

export default Home;
