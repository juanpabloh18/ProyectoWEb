import React, { useState } from "react";
import { auth } from "../bd/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setUserRole }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const isAdmin = {
        email: "juan@18.com",
        password: "181001"
    };

    const SignIn = (e) => {
        e.preventDefault();
        if (email === isAdmin.email && password === isAdmin.password) {
            setUserRole('admin');
            navigate('/Home');
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential);
                    setUserRole('user');
                    navigate('/Home');
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.',
                    });
                });
        }
    };

    return (
        <div>
            <form onSubmit={SignIn}>
                <h1>Login</h1>
                <input 
                    type="email" 
                    placeholder="Correo" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
                <p>No tienes cuenta <Link to="/CrearCuenta">Regístrate</Link></p>
                
            </form>
        </div>
    );
}

export default Login;
