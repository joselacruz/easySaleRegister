import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { updateFirebase } from "../../utils/firebase";
import FileUpload from "../FileUpload";
import { modifyImages } from "../../utils/savedImgToCloud";

const ProductFromEdit = ({ product, setState, redirectTo }) => {
  // Estado local que almacena los datos del formulario
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    salePrice: product.salePrice,
    url: product.url,
  });

  // Estado local que indica si ha habido cambios en el formulario, inicialmente establecido como falso
  const [areThereChanges, setAreThereChanges] = useState(false);

  // Imágenes originales del producto obtenidas del estado del producto
  const defaulImages = product.image;

  // Estado local que contiene las imágenes editadas
  const [images, setImages] = useState(defaulImages);

  /**
   * Maneja el cambio de valor en los campos del formulario.
   *
   * @param {Event} e - Objeto de evento del cambio.
   */
  const handleChange = (e) => {
    // Extrae el nombre y el valor del campo del evento
    const { name, value } = e.target;

    // Actualiza el estado del formulario con el nuevo valor
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Indica que hay cambios en algún input, habilitando el botón
    setAreThereChanges(true);
  };

  // * FIN handleChange

  /**
   * Maneja la presentación del formulario cuando se envía.
   *
   * @param {Event} event - Objeto de evento de formulario.
   */

  const handleSubmit = async (event) => {
    // Evita que el formulario se envíe automáticamente
    event.preventDefault();
    // si fueron eliminadas todas las imagenes
    if (images.length === 0) {
      alert("al menos una imagen es requerida");
    } else {
      try {
        //si  el usuario subio  una nueva imagen y es de tipo File
        //subimos la img a imgbb para obtener la url
        const newImageUrlSavedCloud = await modifyImages(images);

        // nueva data  a actualizar
        const newData = { ...formData, image: newImageUrlSavedCloud };

        // actualizamos el estado del contexto que muestra la imagen en grande y descripcion del producto
        // para que cuando el usuario vea los cambios
        setState((prevState) => ({
          ...prevState,
          ...newData,
        }));

        // actualizamos el doc de firebase
        updateFirebase({ docID: product.id, data: newData });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ** FIN handleSubmit

  /**
   * Renderiza un campo de entrada (input) utilizando el componente TextField de Material-UI.
   *
   * @param {Object} param0 - Los parámetros del campo de entrada.
   * @param {string} param0.label - Etiqueta del campo de entrada.
   * @param {string} param0.name - Nombre del campo de entrada, utilizado como identificador.
   * @param {boolean} [param0.multiline=false] - Indica si el campo de entrada es de varias líneas.
   * @param {number} [param0.rows=1] - Número de filas visible en el campo de entrada multilineal.
   *
   * @returns {JSX.Element} - Componente TextField renderizado.
   */
  const renderInput = ({ label, name, multiline = false, rows = 1 }) => {
    return (
      <TextField
        fullWidth
        label={label}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        margin="normal"
        size="small"
        multiline={multiline}
        rows={rows}
        required
      />
    );
  };
  // ** FIN  renderInput

  /**
   * Efecto React que se ejecuta cuando el array de images local cambia
   * con una condicinal que verifica si la logitus de images local es diferente a
   *  Imágenes originales del producto obtenidas del estado del producto
   */
  useEffect(() => {
    // Verifica si la longitud de las imágenes ha cambiado con respecto a las imágenes originales

    if (
      images.length > defaulImages.length ||
      images.length < defaulImages.length
    ) {
      //hay cambios habilitamos el boton de guardar
      setAreThereChanges(true);
    }
  }, [images]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >
      {renderInput({ label: "Titulo", name: "title" })}
      {renderInput({ label: "URL del Producto", name: "url" })}
      {renderInput({ label: "Precio", name: "price" })}
      {renderInput({
        label: "Descripción",
        name: "description",
        multiline: true,
        rows: 12,
      })}

      <FileUpload
        images={images}
        setImages={setImages}
      />
      <Box
        display={"flex"}
        gap={3}
        marginTop={3}
      >
        <Button
          type="button"
          onClick={redirectTo}
        >
          Cancelar
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loadingIndicator="Guardando..."
          loading={false}
          disabled={!areThereChanges}
        >
          Guardar Producto
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ProductFromEdit;
