import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { mainListItems, secondaryListItems } from "./ListItems";

export const Aside = ({toggleDrawer}: any) => {
  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
          background: "#8561c5",
          border: "none",
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon sx={{color: "white"}}/>
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </>
  );
};
