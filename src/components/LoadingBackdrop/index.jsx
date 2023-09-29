import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Renderiza un fondo semitransparente con un indicador de carga circular
 * para indicar que se está llevando a cabo una tarea en segundo plano, como la descarga.
 * @returns {JSX.Element} Elemento JSX que representa el Backdrop de carga.
 */
const LoadingBackdrop = ({ open }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
