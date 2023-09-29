import { Box, Container, Typography } from "@mui/material";
import ButtonDownload from "../ButtonDownload";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GalleryMovil = ({
  images,
  handleDownloadImage,
  openBackdrop,
  handleCarouselChange,
}) => {
  return (
    <Container style={{ position: "relative" }}>
      <ButtonDownload
        size={"28px"}
        download={handleDownloadImage}
        openBackdrop={openBackdrop}
      />
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
    </Container>
  );
};
export default GalleryMovil;
