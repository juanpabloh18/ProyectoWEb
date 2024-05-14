import React, { useState } from "react";
import { auth } from "../bd/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";




const CrearCuenta = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const navigate = useNavigate();

    const SignUp = (e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password).then ((useCredential)=>{
            console.log(useCredential);
                navigate('/');
        }).catch((error)=>{
            console.log(error);
        })


    }
    

    return (
        <>
           <div>
            <form onSubmit={SignUp}>
                <h1>CrearCuenta</h1>
                <input type="email" placeholder="Correo" value={email} onChange={(e) =>setEmail(e.target.value)}></input>
                <input type="password" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <button type="submit">Sign up</button>
              <p>Si ya tienes cuenta has  <Link to="/">Login</Link></p>
            </form>
           </div>
        </>
    );
}

export default CrearCuenta;

