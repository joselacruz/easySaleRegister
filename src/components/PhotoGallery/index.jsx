import {
  Card,
  CardMedia,
  IconButton,
  Box,
  Typography,
  Backdrop,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import "./ProductGallery.css";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();

// Estilos personalizados para las miniaturas (thumbnails)
const StyledThumbnail = styled("img")`
  max-height: 100%;
  width: 100%;
  cursor: pointer;
  object-fit: cover; /* Recorta la miniatura para que quepa en el contenedor */
  border: 2px solid transparent;
  transition: border 0.3s ease-in-out;

  ${(props) =>
    props.isSelected &&
    `
      border: 2px solid ${theme.palette.primary.main};
    `}
`;

const ProductGallery = ({ images }) => {
  const [openbackdrop, setOpenBackdrop] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleDownloadImage = () => {
    // Crea una solicitud fetch para obtener la imagen seleccionada
    setOpenBackdrop(true);
    fetch(selectedImage)
      .then((response) => response.blob())
      .then((blob) => {
        // Crea una URL de objeto para la imagen descargable
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Crea un enlace temporal para la descarga automática
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.setAttribute("download", selectedImage);

        // Dispara el clic en el enlace para iniciar la descarga
        downloadLink.click();
        setTimeout(() => {
          setOpenBackdrop(false);
        }, 500);
      })
      .catch((error) => {
        console.error("Error al descargar la imagen:", error);
        setOpenBackdrop(false);
      });
  };

  const buttonDownload = (size) => {
    return (
      <IconButton
        variant="contained"
        color="primary"
        onClick={handleDownloadImage}
        sx={{
          position: "absolute",
          top: "0px",
          right: "0px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <SaveAltIcon sx={{ fontSize: `${size}` }} />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openbackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </IconButton>
    );
  };

  const handleCarouselChange = (index) => {
    setSelectedImage(images[index]);
  };

  return (
    <>
      {isMobile ? (
        // Para Pantallas mas moviles
        <Carousel
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          onChange={handleCarouselChange}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index}`}
              />
              {buttonDownload("28px")}
              <Box
                sx={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  backgroundColor: "#f5f5f5",
                  padding: "4px",

                  borderRadius: "50%",
                }}
              >
                <Typography variant="body1">
                  {`${index + 1}/${images.length}`}
                </Typography>
              </Box>
            </div>
          ))}
        </Carousel>
      ) : (
        // Para Pantallas mas Grandes
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row-reverse",
          }}
        >
          <Card
            elevation={0}
            sx={{ width: "60%", position: "relative" }}
          >
            <CardMedia
              sx={{
                height: 400,
                backgroundSize: "contain",
                borderRadius: "none",
              }}
              image={selectedImage}
              title="green iguana"
            />
            {buttonDownload("48px")}
          </Card>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {images.map((image, index) => (
              <Box
                key={index}
                width="50px"
                height="50px"
              >
                <StyledThumbnail
                  src={image}
                  alt={`Thumbnail ${index}`}
                  isSelected={image === selectedImage}
                  onClick={() => handleThumbnailClick(image)}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductGallery;
