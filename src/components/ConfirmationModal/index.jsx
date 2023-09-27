import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  Alert,
  Typography,
  AlertTitle,
  Box,
} from "@mui/material";

const ConfirmationModal = ({ open, onClose, onDelete, productDeleteTitle }) => {
  // Estado valor del input
  const [inputValue, setInputValue] = useState("");

  // Estado para desactivar el boton de confirmación
  const [disabled, setDisabled] = useState(true);

  /**
   * Evento click del boton confirmar
   * el cual cierra el Dialog y elimina el elemento
   */
  const handleConfirm = () => {
    onDelete();
    onClose();
    setInputValue("");
  };
  // ** Fin de la función handleConfirm

  /**Función que activa el botón de confirmación cuando se escribe "si" en el input.
   *   Esta función verifica el texto ingresado en el input y habilita el botón de confirmación
   *   si el texto es "si". De lo contrario, deshabilita el botón.

   * @param {Object} event El evento de cambio del input.
   */
  const onChangeInput = (event) => {
    const strTyping = event.target.value;
    setInputValue(strTyping);
    if (strTyping.toLowerCase() === "si") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  // ** Fin de la función onChangeInput

  //Efecto para borrar el estado del inputValue cada vez que el Dialog se cierra
  useEffect(() => {
    if (!open) {
      setInputValue("");
    }
  }, [onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      backdropclick="true"
    >
      <Alert severity="warning">
        <AlertTitle sx={{ fontSize: "1.5rem" }}>
          ¿Quieres borrar este producto?
        </AlertTitle>
        Esta acción borrará de manera permanente los cambios son inrreversibles
      </Alert>

      <DialogContent>
        <Typography variant="subtitle2">Producto</Typography>
        <Typography variant="body2">{productDeleteTitle}</Typography>
        <p>
          Para confirmar que deseas borrar este producto, escribe: <b>si</b>
        </p>
        <TextField
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={onChangeInput}
        />
      </DialogContent>
      <Box
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <Button
          variant="text"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          disabled={disabled}
          color="primary"
          onClick={handleConfirm}
        >
          Confirmar
        </Button>
      </Box>
    </Dialog>
  );
};

export default ConfirmationModal;
