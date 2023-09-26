import { RegisterProductsProvider } from "../context/RegisterProductsContext.jsx";
import ProductRegister from "../container/ProductRegister/index.jsx";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import Header from "../components/Header/index.jsx";
import { useRoutes, BrowserRouter } from "react-router-dom";
import ProductView from "../pages/ProductView/index.jsx";
import Home from "../pages/Home/index.jsx";
import ResultSearch from "../pages/ResultSearch/index.jsx";

function App() {
  const AppRoutes = () => {
    let routes = useRoutes([
      { path: "/product/:id", element: <ProductView /> },
      { path: "/", element: <Home /> },
      { path: "search/:id", element: <ResultSearch /> },
    ]);
    return routes;
  };

  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={3000}
      >
        <CssBaseline />
        <RegisterProductsProvider>
          <Header children={<ProductRegister />} />
          <AppRoutes />
        </RegisterProductsProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
