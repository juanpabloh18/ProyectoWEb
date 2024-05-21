import React from "react";
import { Menu, Container, Button, Image } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import reactLogo from '../assets/react.svg'
import { auth } from "../bd/firebase";
import { signOut } from "firebase/auth";

const NavbarUser = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <Menu inverted borderless style={{ padding: "0.3rem", marginBotton: "20px" }} attached>
            <Container>
                <Menu.Item name="home">
                    <Link to="/Home">
                        <Image size="mini" src={reactLogo} />
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <h2>PanelUser</h2>
                </Menu.Item>
                <Menu.Item position="right">
                   {/* <Button size="mini" primary onClick={() => navigate("/Agregar")}>Mis torneos</Button>*/}
                </Menu.Item>
                <Menu.Item>
                    <Button size="mini" primary onClick={handleLogout} >Cerrar sesión</Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}


export default NavbarUser;