import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";

export default function ListSuggest({ suggest, onOptionSelect, set }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setSelectedItemIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === "ArrowDown") {
        setSelectedItemIndex((prevIndex) =>
          prevIndex < suggest.length - 1 ? prevIndex + 1 : prevIndex
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggest, selectedItemIndex, onOptionSelect]);

  set(suggest[selectedItemIndex]);
  return (
    <>
      {suggest.length > 0 && (
        <List
          sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}
          aria-label="contacts"
        >
          {suggest.map((option, index) => {
            return (
              <ListItem
                disablePadding
                key={index}
                onClick={() => onOptionSelect(option)}
                selected={selectedItemIndex == index}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={option}
                    sx={{ color: "black" }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}
