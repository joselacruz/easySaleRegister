import LinkIcon from "@mui/icons-material/Link";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { useContext } from "react";

const CardItem = ({ item }) => {
  const context = useContext(RegisterProductsContext);
  const navigate = useNavigate();

  const hadleNavigation = () => {
    const useRoute = item.title.split(" ").join("-");
    const path = `/product/${useRoute}`;

    //cambiamos la ruta y enviamos el objecto a un estado global
    context.setBigProduct(item);
    navigate(path);
  };

  return (
    <Card
      sx={{ width: 265 }}
      elevation={4}
    >
      <CardActionArea onClick={hadleNavigation}>
        <CardMedia
          component="img"
          height="140"
          image={item.image[0]}
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
      <CardActions>
        <IconButton>
          <LinkIcon />
        </IconButton>
        <a
          href={item.url}
          target="_blank"
        >
          Link
        </a>
      </CardActions>
    </Card>
  );
};

export default CardItem;
