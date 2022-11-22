import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

export const Header = (props: any) => {
  return (
    <Toolbar
      sx={{
        pr: "24px", // keep right padding when drawer closed
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={props.toggleDrawer}
        sx={{
          marginRight: "36px",
          ...(props.open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
    </Toolbar>
  );
}
