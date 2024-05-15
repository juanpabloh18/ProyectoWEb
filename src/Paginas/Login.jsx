import React, { useState } from "react";
import { auth } from "../bd/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUserRole }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [loginError, setLoginError] = useState("");
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
                    setLoginError("Las credenciales no coinciden. Por favor, inténtalo de nuevo.");
                    setShowError(true);
                    setTimeout(() => {
                        setShowError(false);
                    }, 5000);
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
                {showError && <p style={{ textAlign: "center", color: "red" }}>{loginError}</p>}
            </form>
        </div>
    );
}

export default Login;
