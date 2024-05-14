import React, { useState,useEffect } from "react";
import { auth } from "../bd/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";



const CrearCuenta = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    

    const SignUp = (e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password).then ((useCredential)=>{
            console.log(useCredential)
        }).catch((error)=>{
            console.log(error);
        })


    }
    

    return (
        <>
           <div>
            <form onSubmit={SignUp}>
                <h1>CrearCuenta|</h1>
                <input type="email" placeholder="Correo" value={email} onChange={(e) =>setEmail(e.target.value)}></input>
                <input type="password" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <button type="submit">Sign up</button>
            </form>
           </div>
        </>
    );
}

export default CrearCuenta;

