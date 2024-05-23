import React, { useState, useEffect } from "react";
import { db, auth } from "../bd/firebase";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, query, where, arrayUnion, arrayRemove } from "firebase/firestore";
import NavbarUser from "./NavbarUser";
import ModalComponente2 from "./ModalComponente2";
import Swal from "sweetalert2";
const VistaUser = () => {
  const [torneos, setTorneos] = useState([]);
  const [inscritos, setInscritos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTorneo, setSelectedTorneo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "torneos"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTorneos(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const fetchInscritos = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "users", user.uid, "torneosInscritos"));
        const querySnapshot = await getDocs(q);
        const inscritoList = querySnapshot.docs.map((doc) => doc.data().torneoId);
        setInscritos(inscritoList);
      }
    };

    fetchInscritos();
  }, []);

  const handleModal = (item) => {
    setOpen(true);
    setSelectedTorneo(item);
  };

  const handleInscripcion = async (torneo) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;

        
        const torneoRef = doc(db, "torneos", torneo.id);
        const torneoSnap = await getDoc(torneoRef);
        if (torneoSnap.exists()) {
          const torneoData = torneoSnap.data();
          const updatedParticipants = torneoData.participants - 1;

          
          await updateDoc(torneoRef, {
            participants: updatedParticipants,
            participantes: arrayUnion(user.email),
          });

          
          await addDoc(collection(db, "users", uid, "torneosInscritos"), {
            torneoId: torneo.id,
            name: torneo.name,
            date: torneo.date,
            info: torneo.info,
            participants: updatedParticipants,
            img: torneo.img,
          });

          
          setInscritos([...inscritos, torneo.id]);
          Swal.fire({
            icon: 'success',
            title: 'Inscripción exitosa',
            text: 'Te has inscrito en el torneo correctamente.',
          });
        }
      }
    } catch (error) {
      console.error("Error al inscribirse en el torneo:", error);
    }
  };

  const handleCancelarInscripcion = async (torneo) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;

        
        const torneoRef = doc(db, "torneos", torneo.id);
        const torneoSnap = await getDoc(torneoRef);
        if (torneoSnap.exists()) {
          const torneoData = torneoSnap.data();
          const updatedParticipants = torneoData.participants + 1;

          
          await updateDoc(torneoRef, {
            participants: updatedParticipants,
            participantes: arrayRemove(user.email),
          });

          
          const q = query(
            collection(db, "users", uid, "torneosInscritos"),
            where("torneoId", "==", torneo.id)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (inscripcion) => {
            await deleteDoc(inscripcion.ref);
          });

        
          setInscritos(inscritos.filter((id) => id !== torneo.id));
          Swal.fire({
            icon: 'success',
            title: 'Cancelación exitosa',
            text: 'Has cancelado tu inscripción al torneo.',
          });
        }
      }
    } catch (error) {
      console.error("Error al cancelar la inscripción:", error);
    }
  };

  return (
    <>
      <NavbarUser />
      <Container>
        <Grid columns={3} stackable>
          {torneos.map((item) => {
            const isInscrito = inscritos.includes(item.id);
            return (
              <Grid.Column key={item.id}>
                <Card style={{ opacity: isInscrito ? 0.7 : 1 }}>
                  <Card.Content style={{ textAlign: "center", marginTop: "10px" }}>
                    <Image
                      src={item.img}
                      size="medium"
                      style={{
                        height: "150px",
                        width: "150px",
                      }}
                    />
                    <Card.Header style={{ marginTop: "10px" }}>{item.name}</Card.Header>
                    <Card.Description style={{ textAlign: "center" }}>
                      <p>Cupos disponibles: {item.participants}</p>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                      {isInscrito ? (
                        <Button
                          color="red"
                          onClick={() => handleCancelarInscripcion(item)}
                        >
                          Cancelar inscripción
                        </Button>
                      ) : (
                        <Button
                          color="green"
                          onClick={() => handleInscripcion(item)}
                          disabled={item.participants <= 0}
                        >
                          Inscribirse
                        </Button>
                      )}
                      <Button
                        color="blue"
                        onClick={() => handleModal(item)}
                      >
                        Ver
                      </Button>
                      {open && <ModalComponente2 open={open} setOpen={setOpen} {...selectedTorneo} />}
                    </div>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default VistaUser;
