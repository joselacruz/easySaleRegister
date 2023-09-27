import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { useContext, useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

const CardItem = ({ item }) => {
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

  return (
    <>
      <Card
        sx={{ width: 265 }}
        elevation={4}
      >
        <CardActionArea onClick={hadleNavigation}>
          <CardMedia
            component="img"
            height="140"
            image={item.image[0]}
            loading="lazy"
            alt={item.title}
            sx={{ objectFit: "contain" }}
          ></CardMedia>
          <CardContent>
            <Typography
              variant="h6"
              color="primary"
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
