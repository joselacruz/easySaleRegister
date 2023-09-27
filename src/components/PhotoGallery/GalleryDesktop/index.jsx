import { Box, Card, CardMedia } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import ButtonDownload from "../ButtonDownload";

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

const GalleryDesktop = ({
  images,
  selectedImage,
  handleThumbnailClick,
  handleDownloadImage,
}) => {
  return (
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
        <ButtonDownload
          size={"48px"}
          download={handleDownloadImage}
        />
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
  );
};
export default GalleryDesktop;
