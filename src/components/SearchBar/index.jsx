import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase, IconButton } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { RegisterProductsContext } from "../../context/RegisterProductsContext";
import ListSuggest from "../ListSuggest";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const Search = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const SearchBar = () => {
  const navigate = useNavigate();
  const context = useContext(RegisterProductsContext);

  const [query, setQuery] = useState("");

  const [suggest, setSuggest] = useState("");

  const [isBoxOpen, setIsBoxOpen] = useState(true);

  const boxRef = useRef(null);

  //Cuando Se escribe en el buscador
  const handleChange = (e) => {
    setIsBoxOpen(true);
    const queryToSearch = e.target.value;
    setQuery(queryToSearch);

    if (isNotBlank(queryToSearch)) {
      //Logica para cargar el array de  la sugerencias
      const result = filterByQuery(queryToSearch);
      const suggestArrayTitles = result.titulosProductosFiltrados;

      //verificamos si lo que escribio el usuario es exactamente igual a las sugerencias
      //para decir mostrarla o no

      if (suggestArrayTitles.includes(queryToSearch.toLowerCase())) {
        //si es igual no duplicamos la sugerencia a mostrar
        setSuggest(suggestArrayTitles);
      } else {
        // si no el igual mostramos la sugerencias y tambien
        //lo que escribio el usuario exactamente en el input
        suggestArrayTitles.unshift(queryToSearch);
        setSuggest(suggestArrayTitles);
      }
    }
  };

  //Cuando es Presionada la Tecla Enter en el Input
  const handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      if (isNotBlank(query)) {
        handleSearch(query);
      }
    }
  };

  function filterByQuery(query) {
    //Remover los espacios en blanco
    const queryParsed = removeWitheSpace(query);

    //Producto filtrado que conciden con lo que tipea el usuario
    if (queryParsed.length > 0) {
      const productosFiltrados = context.products.filter((item) => {
        return item.title.toLowerCase().includes(queryParsed.toLowerCase());
      });

      //Array de Titulo de los productos filtrado para usar en las sugerencias de busqueda
      const titulosProductosFiltrados = productosFiltrados.map((item) =>
        item.title.toLowerCase()
      );
      //Agregamos el identificador  que se usara para mostrar al usuario
      //los resultado de la busqueda que incluye el termino usado para esta Busqueda

      const resultFor = queryParsed.toLowerCase();
      return {
        productosFiltrados,
        titulosProductosFiltrados,
        resultFor,
      };
    }
  }

  //Click en los Elementos de la Lista de sugerencias  ListSuggest
  const handleOptionSelect = (option) => {
    handleSearch(option);
  };

  //click icono de Busqueda
  const handleClickIcon = () => {
    if (isNotBlank(query)) {
      handleSearch(query);
    }
  };

  //realiza y muestra el resultado de la busqueda
  function handleSearch(query) {
    const useFilter = filterByQuery(query);

    //construcion del objeto para enviar al estado global
    const data = {
      result: useFilter.productosFiltrados,
      resultFor: useFilter.resultFor,
    };
    context.setSearchItems(data);

    //construcion de la url para realizar el cambio de ruta
    const url = useFilter.resultFor.split(" ").join("-");
    navigate(`search/${url}`);
    setIsBoxOpen(false);
  }

  //Verifica si la longitud del texto es mayor a 0
  //y Tambien si son solo espacios en blancos
  function isNotBlank(str) {
    return str.length > 0 && str.trim() !== "";
  }

  //Funcion con una expresión regular /\s+/g para buscar
  // y reemplazar uno o más espacios en blanco
  function removeWitheSpace(str) {
    return str.replace(/\s+/g, " ").trim();
  }

  //Para cerra la lista de sugerencias cuando se haga click fuera del elemento
  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsBoxOpen(false);
      }
    }

    if (isBoxOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isBoxOpen]);

  useEffect(() => {
    // Agregar la clase al body cuando la lista de sugerencias esté abierta en dispositivos móviles
    if (isBoxOpen && window.innerWidth <= 599) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      // Asegurarse de eliminar la clase al desmontar el componente
      document.body.classList.remove("no-scroll");
    };
  }, [isBoxOpen]);

  return (
    <div className="searchBar-container">
      <Search
        sx={{
          width: "90%",
          display: "flex",
        }}
      >
        <IconButton
          onClick={handleClickIcon}
          sx={{
            color: "white",
            marginInlineStart: "10px",
          }}
        >
          <SearchIcon />
        </IconButton>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
          value={query}
          onKeyDown={handleEnterKey}
        />
      </Search>
      {isBoxOpen && query.length > 0 && (
        <Box
          ref={boxRef}
          position="absolute"
          sx={{
            width: {
              sm: "465.38px",
              xs: "100%",
            },

            zIndex: 3,
            top: "40px",
          }}
          className="suggest-list"
        >
          <ListSuggest
            suggest={suggest}
            onOptionSelect={handleOptionSelect}
          />
        </Box>
      )}
    </div>
  );
};
export default SearchBar;
