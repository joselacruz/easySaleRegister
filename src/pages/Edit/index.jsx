import { Container, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { useContext } from "react";
import ProductFromEdit from "../../components/ProductFormEdit";
const Edit = () => {
  const context = useContext(RegisterProductsContext);

  const redirectTo = () => {
    history.back();
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        marginBlockStart: "70px",
        display: "grid",
        gap: 2,
        marginBlockEnd: "94px",
      }}
    >
      <IconButton
        onClick={redirectTo}
        sx={{ position: "absolute", top: "100px", left: 0, zIndex: 1 }}
      >
        <ChevronLeftIcon sx={{ fontSize: "48px" }} />
      </IconButton>

      <Typography
        variant="h5"
        align="center"
        gutterBottom
      >
        Editando
      </Typography>
      <ProductFromEdit
        product={context.bigProduct}
        setState={context.setBigProduct}
        redirectTo={redirectTo}
      />
    </Container>
  );
};

export default Edit;
