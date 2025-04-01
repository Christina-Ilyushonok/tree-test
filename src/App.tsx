import React from "react";
import { Box } from "@mui/material";
import TreeView from "./components/TreeView/TreeView";

const App: React.FC = () => {
   return (
      <Box sx={{ padding: 2 }}>
         <TreeView />
      </Box>
   )
};

export default App;