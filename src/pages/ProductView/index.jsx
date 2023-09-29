import { useContext, useEffect } from "react";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import ProductGallery from "../../components/PhotoGallery";
import { Button, Container, IconButton, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LinkIcon from "@mui/icons-material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { formatTextWithLineBreaks } from "../../utils/formatText";

const theme = createTheme();

const ProductView = () => {
  const navigate = useNavigate();

  const context = useContext(RegisterProductsContext);

  const backPage = () => {
    navigate("/");
  };
  const formattedText = formatTextWithLineBreaks(
    context.bigProduct.description
  );

  const handleEdit = () => {
    const url = window.location.pathname.split("/product/").join("");
    navigate(`/edit/${url}`);
  };
  useEffect(() => {
    // Hacer scroll al principio (Y=0) cuando el componente se monta
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        marginBlockStart: "70px",
        display: "grid",
        gap: 2,
        marginBlockEnd: "94px",
      }}
    >
      <IconButton
        onClick={backPage}
        sx={{ position: "absolute", top: "100px", left: 0, zIndex: 1 }}
      >
        <ChevronLeftIcon sx={{ fontSize: "48px" }} />
      </IconButton>

      <ProductGallery images={context.bigProduct.image} />
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        color={theme.palette.primary.main}
      >
        {context.bigProduct.title}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{ display: "flex", alignItems: "center", fontSize: "1rem", gap: 1 }}
      >
        <AttachMoneyIcon sx={{ color: `${theme.palette.primary.main}` }} />
        Precio:
        <Typography
          variant="body2"
          component="span"
          sx={{ marginInlineStart: 1 }}
        >
          ${context.bigProduct.price}
        </Typography>
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{ display: "flex", alignItems: "center", fontSize: "1rem", gap: 1 }}
      >
        <StorefrontIcon sx={{ color: `${theme.palette.primary.main}` }} />
        Precio de venta:
        <Typography
          variant="body2"
          component="span"
          sx={{ marginInlineStart: 1 }}
        >
          ${context.bigProduct.salePrice}
        </Typography>
      </Typography>

      <Typography
        sx={{ display: "flex", alignItems: "center", fontSize: "1rem", gap: 1 }}
      >
        <LinkIcon sx={{ color: `${theme.palette.primary.main}` }} />

        <a
          href={context.bigProduct.url}
          target="_blank"
        >
          Link
        </a>
      </Typography>

      <Typography
        variant="h6"
        component="h3"
      >
        Caracteristicas del producto
      </Typography>
      <Typography gutterBottom>{formattedText}</Typography>
      <Button
        color="secondary"
        variant="contained"
        sx={{ width: "160px", justifySelf: "center" }}
        onClick={handleEdit}
      >
        Editar
      </Button>
    </Container>
  );
};
export default ProductView;
