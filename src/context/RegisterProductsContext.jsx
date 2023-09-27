import { createContext, useState } from "react";
import { deleteFireBase } from "../utils/firebase";

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

  // ** Eliminar productos del estado y de firebase
  const deleteProduct = (product) => {
    const filter = products.filter((item) => item.id !== product.id);
    setProducts(filter);
    deleteFireBase(product.id);
  };
  // **

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
        deleteProduct,
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
