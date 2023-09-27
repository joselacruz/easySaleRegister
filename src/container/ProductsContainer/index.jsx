import { Box } from "@mui/material";

import CardItem from "../../components/CardItem";
import CardItemSkeleton from "../../components/CardItemSkeleton";

const ProductsContainer = ({ products }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={3}
      >
        {products.length > 0 &&
          products.map((item, index) => (
            <CardItem
              item={item}
              key={index}
            />
          ))}

        {products.length === 0 &&
          Array.from(new Array(8)).map((_, index) => (
            <CardItemSkeleton key={index} />
          ))}
      </Box>
    </>
  );
};
export default ProductsContainer;
