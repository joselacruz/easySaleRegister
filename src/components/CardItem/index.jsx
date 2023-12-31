import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { useContext, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

const CardItem = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const context = useContext(RegisterProductsContext);
  const navigate = useNavigate();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const hadleNavigation = () => {
    const useRoute = item.title.split(" ").join("-");
    const path = `/product/${useRoute}`;

    //cambiamos la ruta y enviamos el objecto a un estado global
    context.setBigProduct(item);
    navigate(path);
  };
  const handleLink = () => {
    window.open(item.url, "_blanbk");
  };
  const handleClickConfirmDelete = () => {
    setOpenModalDelete(true);
  };

  function handleDelete() {
    context.deleteProduct(item);
  }

  //Rendediza un Texto en posicion absolute con un backgroud negro encimar de Card
  //para describir que un producto no esta disponible si salePrice es 0
  function notAvailability() {
    return (
      <>
        {item.salePrice == 0 && (
          <Typography
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "45%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              zIndex: 1,
            }}
          >
            No disponible
          </Typography>
        )}
      </>
    );
  }
  return (
    <>
      <Card
        sx={{ width: 265, position: "relative" }}
        elevation={4}
      >
        {notAvailability()}
        <CardActionArea onClick={hadleNavigation}>
          {/* contenedor para mostrar un estado de carga mientras la imagen  aun
          no ha cargado  Cuando la imagen se carga y se ejecuta el evento onLoad, imageLoaded 
          se establece en true, lo que hará que el div de fondo gris con el indicador de carga 
          desaparezca, revelando la imagen cargada debajo. */}
          <div style={{ position: "relative" }}>
            {imageLoaded ? null : (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(242, 242, 242, 0.2)",
                }}
              >
                <CircularProgress color="primary" />
              </div>
            )}
            <CardMedia
              component="img"
              height="140"
              image={item.image[0]}
              loading="lazy"
              alt={item.title}
              sx={{ objectFit: "contain" }}
              onLoad={handleImageLoad}
            />
          </div>

          <CardContent>
            <Typography
              variant="subtitle1"
              color="primary"
              height="64px"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {item.title}
            </Typography>
            <Typography variant="subtitle2">
              Precio:
              <Typography
                variant="body2"
                component="span"
                sx={{ marginInlineStart: 1 }}
              >
                $ {item.price}
              </Typography>
            </Typography>
            <Typography variant="subtitle2">
              Precio Venta:
              <Typography
                variant="body2"
                component="span"
                sx={{ marginInlineStart: 1 }}
              >
                $ {item.salePrice}
              </Typography>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Button
            variant="contained"
            size="small"
            endIcon={<LinkIcon />}
            onClick={handleLink}
          >
            Link
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleClickConfirmDelete}
          >
            Eliminar
          </Button>
        </CardActions>
      </Card>

      <ConfirmationModal
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        onDelete={handleDelete}
        productDeleteTitle={item.title}
      />
    </>
  );
};

export default CardItem;
