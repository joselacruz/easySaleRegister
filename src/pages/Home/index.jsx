import { Container, Typography } from "@mui/material";
import ProductsContainer from "../../container/ProductsContainer";
import { readFirebase } from "../../utils/firebase";
import { useContext, useEffect } from "react";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";

const Home = () => {
  const context = useContext(RegisterProductsContext);

  useEffect(() => {
    async function loadData() {
      const response = await readFirebase("items");
      context.setProducts(response);
    }
    loadData();
  }, []);

  return (
    <Container
      component="main"
      sx={{ marginBlockStart: "40px", marginBlockEnd: "90px" }}
    >
      <Typography
        variant="h4"
        gutterBottom={true}
        textAlign="center"
        component="h1"
        marginBlockEnd="20px"
      >
        Mis Productos
      </Typography>
      <ProductsContainer products={context.products} />
    </Container>
  );
};
export default Home;
