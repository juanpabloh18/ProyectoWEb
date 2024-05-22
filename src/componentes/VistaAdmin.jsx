import { useState, useEffect } from "react";
import { db, storage } from "../bd/firebase";
import { Button, Card, Grid, Container, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import NavbarAdmin from "./NavbarAdmin";
import ModalComponente from "../componentes/ModalComponente";

const VistaAdmin = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async (id, imgURL) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      try {
        setOpen(false);


        if (imgURL) {
          const imageRef = ref(storage, imgURL);
          await deleteObject(imageRef);
        }


        await deleteDoc(doc(db, "torneos", id));


        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };



  return (
    <>
      <NavbarAdmin />
      <Container>
        <Grid columns={3} stackable>
          {users && users.map((item) => (
            <Grid.Column key={item.id}>
              <Card>
                <Card.Content style={{ textAlign: "center", marginTop: "10px"}}>
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
                  <Card.Description style={{ textAlign: "center" }}>{item.info}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <Button
                      color="green"
                      onClick={() => navigate(`/Actualizar/${item.id}`)}
                    >
                      Actualizar
                    </Button>
                    <Button color="blue" onClick={() => handleModal(item)}>
                      Ver
                    </Button>
                    {open && (
                      <ModalComponente
                        open={open}
                        setOpen={setOpen}
                        handleDelete={handleDelete}
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

export default VistaAdmin;