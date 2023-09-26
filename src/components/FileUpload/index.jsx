import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Box, Button, IconButton } from "@mui/material";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const FileUpload = () => {
  const context = useContext(RegisterProductsContext);

  const onDrop = useCallback(
    (acceptedFiles) => {
      context.setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...acceptedFiles,
      ]);
    },
    [context.selectedFiles]
  );

  const removeFile = (index) => {
    context.setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Acepta solo imágenes
  });

  return (
    <>
      <div
        {...getRootProps()}
        style={dropzoneStyles}
      >
        <input {...getInputProps()} />
        <Typography
          variant="body1"
          component="p"
        >
          Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos
        </Typography>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "10px",
            justifyContent: "center",
          }}
        >
          {context.selectedFiles.map((file, index) => (
            <div
              key={index}
              style={{ margin: "5px" }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                width="50"
                height="50"
              />
              <Typography
                variant="body2"
                align="center"
                fontSize="10px"
              >
                {file.name}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation(); // Evita la propagación del evento al contenedor Dropzone
                  removeFile(index);
                }}
              >
                Eliminar
              </Button>
            </div>
          ))}
        </Box>
        {context.selectedFiles.length === 0 && (
          <Button
            variant="outlined"
            color="primary"
          >
            Agregar
          </Button>
        )}
        {context.selectedFiles.length > 0 && (
          <IconButton
            variant="outlined"
            color="secondary"
          >
            <AddAPhotoIcon sx={{ fontSize: "48px" }} />
          </IconButton>
        )}
      </div>
      <Box mt={2}></Box>
    </>
  );
};

const dropzoneStyles = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default FileUpload;
