import React from "react";
import { Modal, Header, Image, Button } from "semantic-ui-react";

const ModalComponente2 = ({
    open,
    setOpen,
    img,
    name,
    info,
    date,
    participants,
}) => {
    return (
        <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
            <Modal.Header>Detalles del Torneo</Modal.Header>
            <Modal.Content image>
                <Image size="medium" src={img} wrapped />
                <Modal.Description>
                    <Header>{name}</Header>
                    <p>Cupos disponibles: {participants}</p>
                    <p>Fecha: {date}</p>
                    <p>Información: {info}</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Cerrar
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalComponente2;
