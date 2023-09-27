import { useState } from "react";
import { Backdrop, useMediaQuery } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import GalleryMovil from "./GalleryMovil";
import GalleryDesktop from "./GalleryDesktop";
import { useSnackbar } from "notistack";

import "./ProductGallery.css";

const ProductGallery = ({ images }) => {
  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useMediaQuery("(max-width:768px)");

  //estado para indicar que se está llevando a cabo la descarga
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //Imagen actual de la galeria de fotos
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  /**
   * Función que se ejecuta cuando cambia la imagen actual en el carrusel de GalleryMovil.
   * Actualiza el estado de la imagen seleccionada.
   * @param {number} index - El índice de la nueva imagen seleccionada en el carrusel.
   */

  const handleCarouselChange = (index) => {
    setSelectedImage(images[index]);
  };
  // ** Fin de handleCarouselChange

  /**
   * Maneja la descarga de la imagen seleccionada.
   * Abre un fondo de carga, realiza una solicitud fetch para obtener la imagen,
   * crea una URL de objeto para la imagen descargable y la descarga automáticamente.
   * Cierra el fondo de carga al finalizar la operación.
   */
  const handleDownloadImage = async () => {
    try {
      // Abre el fondo de carga
      setOpenBackdrop(true);

      // Crea una solicitud fetch para obtener la imagen seleccionada
      const response = await fetch(selectedImage);

      // Maneja errores si la respuesta no es exitosa
      if (!response.ok) {
        throw new Error(
          `Error al descargar la imagen. Código de estado: ${response.status}`
        );
      }

      // Obtiene la imagen como un objeto Blob
      const blob = await response.blob();

      // Crea una URL de objeto para la imagen descargable
      const url = window.URL.createObjectURL(new Blob([blob]));

      // Crea un enlace temporal para la descarga automática
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.setAttribute("download", selectedImage);

      // Dispara el clic en el enlace para iniciar la descarga
      downloadLink.click();

      //Alerta  con notiStack imagen descargada con exito
      enqueueSnackbar("Descarga Exitosa", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      //Alerta con notiStack  error al descargar
      enqueueSnackbar("Error al descargar la imagen", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } finally {
      // Cierra el fondo de carga después de un breve retraso
      setTimeout(() => {
        setOpenBackdrop(false);
      }, 500);
    }
  };
  // *** Fin de handleDownloadImage

  /**
   * Renderiza un fondo semitransparente con un indicador de carga circular
   * para indicar que se está llevando a cabo una tarea en segundo plano, como la descarga.
   * @returns {JSX.Element} Elemento JSX que representa el Backdrop de carga.
   */
  const renderLoadingBackdrop = () => {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
  // **  Fin de la Funcion renderLoadingBackdrop

  return (
    <>
      {renderLoadingBackdrop()}
      {isMobile ? (
        // Para Pantallas mas moviles

        <GalleryMovil
          images={images}
          handleDownloadImage={handleDownloadImage}
          handleCarouselChange={handleCarouselChange}
        />
      ) : (
        // Para Pantallas mas Grandes

        <GalleryDesktop
          images={images}
          handleDownloadImage={handleDownloadImage}
          selectedImage={selectedImage}
          handleThumbnailClick={handleThumbnailClick}
        />
      )}
    </>
  );
};

export default ProductGallery;
