import { useState, useEffect } from "react";
import { db } from "../bd/firebase";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { collection, onSnapshot } from "firebase/firestore";
import NavbarUser from "./NavbarUser";
import ModalComponente2 from "./ModalComponente2";


const VistaUser = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
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
        setUsers(list);
        setLoading(false);
      }, (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleModal = (item) => {
    setOpen(true);
    setUser(item);
  };

  return (
    <>
      <NavbarUser />
      <Container>
        <Grid columns={3} stackable>
          {users && users.map((item) => (
            <Grid.Column key={item.id}>
              <Card>
                <Card.Content style={{ textAlign: "center", marginTop: "10px" }}>
                  <Image
                    src={item.img}
                    size="medium"
                    style={{
                      height: "150px",
                      width: "150px"
                    }}
                  />
                  <Card.Header style={{ marginTop: "10px" }}>
                    {item.name}
                  </Card.Header>
                  <Card.Description style={{ textAlign: "center" }}>
                    <p>Cupos disponibles: {item.participants}</p>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <Button color="green" onClick={() => alert('Función de inscripción próximamente')}>
                      Inscribirse
                    </Button>
                    <Button color="blue" onClick={() => handleModal(item)}>
                      Ver
                    </Button>
                    {open && (
                      <ModalComponente2
                        open={open}
                        setOpen={setOpen}
                        {...user}
                      />
                    )}
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default VistaUser;
