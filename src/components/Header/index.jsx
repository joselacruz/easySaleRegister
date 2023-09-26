import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchBar from "../SearchBar";

const Header = ({ children }) => {
  const context = useContext(RegisterProductsContext);

  const handleDrawerOpen = () => {
    context.setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    context.setOpenDrawer(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        minHeight: "80px",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Toolbar>
        <Button
          color="inherit"
          onClick={handleDrawerOpen}
          sx={{ fontWeight: "bold" }}
          startIcon={<AddCircleOutlineIcon />}
        >
          Registrar Producto
        </Button>
      </Toolbar>
      <SearchBar />
      <Drawer
        anchor="left"
        open={context.openDrawer}
        onClose={handleDrawerClose}
      >
        <Box paddingBottom={6}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ fontSize: "48px" }} />
          </IconButton>
          {children}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
