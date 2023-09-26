import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProductsContainer from "../../container/ProductsContainer";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { useContext } from "react";
import NoResultsMessage from "../../components/NoResultsMessage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResultSearch = () => {
  const navigate = useNavigate();
  const context = useContext(RegisterProductsContext);
  const backPage = () => {
    navigate("/");
  };

  const resultsWereFound = () => {
    if (context.searchItems.result?.length > 0) {
      return (
        <>
          <div style={{ marginBlockEnd: "18px" }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              {context.searchItems.resultFor}
            </Typography>
            <Typography variant="body1">
              {`${context.searchItems.result?.length} resultados`}
            </Typography>
          </div>
          <ProductsContainer products={context.searchItems.result} />
        </>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 130px)", // Ajusta la altura según tus márgenes
          }}
        >
          <NoResultsMessage />
        </div>
      );
    }
  };

  return (
    <Container
      component="main"
      sx={{ marginBlockStart: "40px", marginBlockEnd: "100px" }}
    >
      <IconButton
        onClick={backPage}
        sx={{ position: "absolute", top: "100px", left: 0, zIndex: 1 }}
      >
        <ChevronLeftIcon sx={{ fontSize: "48px" }} />
      </IconButton>
      {resultsWereFound()}
    </Container>
  );
};

export default ResultSearch;
