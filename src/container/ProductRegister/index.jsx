import ProductForm from "../../components/ProductForm";
import FileUpload from "../../components/FileUpload";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { useContext } from "react";
import axios from "axios";
import { saveToFirebase } from "../../utils/firebase";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";

const ProductRegister = () => {
  const context = useContext(RegisterProductsContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    context.setRequest(true);
    // verificamos Si el usuario no a cargado una imagen

    if (context.selectedFiles.length > 0) {
      try {
        await saved();
        context.setRequest(false);

        //una vez guardado el estado reniciamos el estado del contexto
        context.resetFormAndSelectedFiles();
        //y cerramos el drawer
        context.setOpenDrawer(false);
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        context.setRequest(false);
      }
    } else {
      enqueueSnackbar("Agrega una imagen del producto", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      console.log("seleciona una imagen valida");
      context.setRequest(false);
    }
  };

  async function savedImgToCloud() {
    const imgbbApiKey = "1b91f9a3d5903a4a436a45f8552799cd"; // Reemplaza con tu clave API de ImgBB
    const apiUrl = `https://api.imgbb.com/1/upload?&key=${imgbbApiKey}`;
    const uploadedImageURLs = [];

    try {
      // Crea un array de promesas para cargar todas las imágenes en paralelo
      const uploadPromises = context.selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          const imageURL = response.data.data.url;
          uploadedImageURLs.push(imageURL);

          // Aquí puedes realizar más acciones con la URL de la imagen si es necesario
        } else {
          console.error("Error al cargar una imagen:", response.statusText);
        }
      });

      // Espera a que se completen todas las promesas de carga de imágenes
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      return uploadedImageURLs;
    }
  }
  async function saved() {
    try {
      // Subimos las imágenes a imgBB
      // para obtener un array con las URLs de las imágenes subidas a imgBB
      const urlImg = await savedImgToCloud();

      // Parseamos la data a guardar en Firestore
      const savedData = { ...context.formData };
      savedData["image"] = urlImg;

      //Guardamos los datos en el Estado del Contexto
      context.addProduct(savedData);
      // Finalmente, se guardan los datos en Firestore
      await saveToFirebase(savedData, "items");
    } catch (error) {
      console.error("Error en la operación de guardado:", error);
      // Puedes manejar el error de acuerdo a tus necesidades.
      throw error; // Esto permite propagar el error hacia arriba si es necesario.
    }
  }

  return (
    <>
      <ProductForm
        submit={handleSubmit}
        component={<FileUpload close />}
      />
    </>
  );
};

export default ProductRegister;