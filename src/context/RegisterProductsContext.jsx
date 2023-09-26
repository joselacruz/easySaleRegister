import { createContext, useState } from "react";

const initialState = {
  title: "",
  description: "",
  price: "",
  salePrice: "",
  url: "",
};
export const RegisterProductsContext = createContext();

export const RegisterProductsProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialState);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [request, setRequest] = useState(false);
  const [products, setProducts] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bigProduct, setBigProduct] = useState({});

  const [searchItems, setSearchItems] = useState({});

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateFormData = (data) => {
    setFormData(data);
  };
  const resetFormAndSelectedFiles = () => {
    setFormData(initialState);
    setSelectedFiles([]);
  };

  return (
    <RegisterProductsContext.Provider
      value={{
        formData,
        updateFormData,
        selectedFiles,
        setSelectedFiles,
        request,
        setRequest,
        products,
        setProducts,
        addProduct,
        resetFormAndSelectedFiles,
        openDrawer,
        setOpenDrawer,
        bigProduct,
        setBigProduct,
        searchItems,
        setSearchItems,
      }}
    >
      {children}
    </RegisterProductsContext.Provider>
  );
};
