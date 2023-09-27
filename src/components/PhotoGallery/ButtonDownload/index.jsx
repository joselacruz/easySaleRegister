import { Backdrop, IconButton } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CircularProgress from "@mui/material/CircularProgress";

const ButtonDownload = ({ size, download, openBackdrop }) => {
  const handleClick = () => {
    download();
  };

  return (
    <IconButton
      variant="contained"
      color="primary"
      onClick={handleClick}
      sx={{
        position: "absolute",
        top: "0px",
        right: "0px",
        backgroundColor: "#f5f5f5",
        zIndex: 100,
      }}
      disabled={openBackdrop}
    >
      <SaveAltIcon sx={{ fontSize: `${size}` }} />
    </IconButton>
  );
};

export default ButtonDownload;
