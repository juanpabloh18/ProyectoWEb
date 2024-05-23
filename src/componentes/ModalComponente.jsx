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
    participantes,
    id,
    handleDelete,
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
                    <Header as="h4">Participantes:</Header>
                    <ul>
                        {participantes && participantes.map((email, index) => (
                            <li key={index}>{email}</li>
                        ))}
                    </ul>
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
