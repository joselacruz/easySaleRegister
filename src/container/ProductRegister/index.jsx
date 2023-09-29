import ProductForm from "../../components/ProductForm";
import FileUpload from "../../components/FileUpload";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { useContext } from "react";
import { savedImgToCloud } from "../../utils/savedImgToCloud";
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
        enqueueSnackbar("Error al  guardar los datos", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
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

  async function saved() {
    try {
      // Subimos las imágenes a imgBB
      // para obtener un array con las URLs de las imágenes subidas a imgBB
      const urlImg = await savedImgToCloud({
        selectedFiles: context.selectedFiles,
      });

      if (!urlImg) {
        throw error;
      }

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
        component={
          <FileUpload
            images={context.selectedFiles}
            setImages={context.setSelectedFiles}
          />
        }
      />
    </>
  );
};

export default ProductRegister;
