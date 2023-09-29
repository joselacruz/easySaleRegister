import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";

function NoResultsMessage() {
  return (
    <Alert
      severity="warning"
      icon={<SearchIcon sx={{ ml: 2, fontSize: 24 }} />}
    >
      <AlertTitle>
        No hay publicaciones que coincidan con tu búsqueda.
      </AlertTitle>
      <List>
        <ListItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <StarIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText primary="Revisa la ortografía de la palabra." />
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <StarIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText primary="Utiliza palabras más genéricas o menos palabras." />
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <StarIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText primary="Navega por las categorías para encontrar un producto similar." />
        </ListItem>
      </List>
    </Alert>
  );
}

export default NoResultsMessage;
