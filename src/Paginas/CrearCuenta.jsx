import React, { useState } from "react";
import { auth, db } from "../bd/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CrearCuenta = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const SignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                console.log(userCredential);
                const user = userCredential.user;
                
                await setDoc(doc(db, "users", user.uid), {
                    email: email,
                    password: password
                });
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <h1>Sign Up</h1>
                </div>
                <form onSubmit={SignUp}>
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
                        <button type="submit" className="btn btn-primary btn-lg">Sign up</button>
                    </div>
                    <p className="text-center mt-3">
                        Si ya tienes cuenta <Link to="/">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default CrearCuenta;
