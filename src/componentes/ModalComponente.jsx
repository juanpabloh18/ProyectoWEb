// src/ModalComponente.js
import React from "react";
import { Modal, Header, Image, Button } from "semantic-ui-react";

const ModalComponente = ({
    open,
    setOpen,
    img,
    name,
    info,
    date,
    participants,
    id,
    handleDelete,
}) => {
    return (
        <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
            <Modal.Header>Detalles del usuario</Modal.Header>
            <Modal.Content image>
                <Image size="medium" src={img} wrapped />
                <Modal.Description>
                    <Header>{name}</Header>
                    <p>Participantes: {participants}</p>
                    <p>Fecha: {date}</p>
                    <p>Información: {info}</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Cancelar
                </Button>
                <Button
                    color="red"
                    content="Eliminar"
                    labelPosition="right"
                    icon="delete"
                    onClick={() => handleDelete(id, img)}
                />
            </Modal.Actions>
        </Modal>
    );
};

export default ModalComponente;
