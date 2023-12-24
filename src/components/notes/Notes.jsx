import { useContext, useState } from "react";
import "./notes.css";
import ListView from '../List'
import GridView from '../Grid'
import { Box, Grid, List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

import { DataContext } from "../../context/DataProvider";

//components
import Form from "./Form";
import Note from "./Note";
import EmptyNotes from "./EmptyNotes";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Notes = () => {
  const { notes, isGrid } = useContext(DataContext);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>
        <DrawerHeader />
        <Form />
        {notes.length > 0 ? (
            (
              isGrid ? <GridView /> : <ListView/>
            ) 
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
};

export default Notes;
