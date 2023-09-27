import ProductForm from "../../components/ProductForm";
import FileUpload from "../../components/FileUpload";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { useContext } from "react";
import axios from "axios";
import { saveToFirebase } from "../../utils/firebase";
import { useSnackbar } from "notistack";

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
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });

      context.setRequest(false);
    }
  };

  async function savedImgToCloud() {
    const imgbbApiKey = "1b91f9a3d5903a4a436a45f8552799cd"; // Reemplaza con tu clave API de ImgBB
    const apiUrl = `https://api.imgbb.com/1/upload?&key=${imgbbApiKey}`;
    const uploadedImageURLs = [];

    try {
      // Crea un array de promesas para cargar todas las imágenes en paralelo
      const uploadPromises = context.selectedFiles.map(async (file, index) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await axios.post(apiUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            const imageURL = response.data.data.url;
            uploadedImageURLs[index] = imageURL; // Almacena la URL en el índice correcto
          } else {
            console.error("Error al cargar una imagen:", response.statusText);
          }
        } catch (error) {
          console.error("Error al cargar una imagen:", error);
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

      // Finalmente, se guardan los datos en Firestore
      const docId = await saveToFirebase(savedData, "items");

      //Guardamos los datos en el Estado del Contexto con el id de referencia
      //del doc de firestore
      context.addProduct({ id: docId, ...savedData });
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
        component={<FileUpload />}
      />
    </>
  );
};

export default ProductRegister;
