import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";

export const Init = () => {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Seja bem vindo! 
      </Typography>
    </Paper>
  );
};
