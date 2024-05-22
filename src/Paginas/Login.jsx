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
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
            <div className="text-center mb-4">
                <h1>Bienvenido</h1>
            </div>
            <form onSubmit={SignIn}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Login</button>
                </div>
                <p className="text-center mt-3">
                    No tienes cuenta? <Link to="/CrearCuenta">Regístrate</Link>
                </p>
            </form>
        </div>
    </div>
    );
}

export default Login;
