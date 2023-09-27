import React, { useContext } from "react";
import { TextField, Container, Typography, Box, Grid } from "@mui/material";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import { LoadingButton } from "@mui/lab";

const ProductForm = ({ component, submit }) => {
  const context = useContext(RegisterProductsContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    context.updateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h5"
        align="center"
        gutterBottom
      >
        Formulario de Producto
      </Typography>
      <Box
        component="form"
        onSubmit={submit}
      >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={6}
          >
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={context.formData.title}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              fullWidth
              label="URL del Producto"
              name="url"
              value={context.formData.imageUrl}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </Grid>

          <Grid
            item
            xs={6}
          >
            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              value={context.formData.price}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <TextField
              fullWidth
              label="Precio de Venta"
              name="salePrice"
              type="number"
              value={context.formData.salePrice}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              fullWidth
              label="Descripción"
              multiline="true"
              rows={4}
              name="description"
              value={context.formData.description}
              onChange={handleChange}
              margin="normal"
              size="small"
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography variant="subtitle1">Imagen:</Typography>
            {component}
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
        >
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loadingIndicator="Cargando..."
            loading={context.request}
          >
            Guardar Producto
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductForm;
