import { Box } from "@mui/material";

import CardItem from "../../components/CardItem";

const ProductsContainer = ({ products }) => {
  return (
    <>
      {products.length > 0 && (
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={3}
        >
          {products.map((item, index) => {
            return (
              <CardItem
                item={item}
                key={index}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};
export default ProductsContainer;
