import { useState, FormEvent } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useMutation, gql } from "@apollo/client";

const CREATE_CAR = gql`
  mutation ($name: String!, $board: String!, $manufacturingDate: String!) {
    createUser(
      name: $name
      board: $board
      manufacturingDate: $manufacturingDate
    ) {
      id
      name
      board
      manufacturingDate
    }
  }
`;

export const Create = () => {
  const [name, setName] = useState("");
  const [board, setBoard] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");

  const [createUser, { data, loading, error }] = useMutation(CREATE_CAR);

  async function handleSubmit (event: FormEvent) {
    event.preventDefault();

    if(!name) {return}

    await createUser({
      variables: {
        name,
        board,
        manufacturingDate
      }
    })

    console.log(data);
  };

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Criar
      </Typography>
      <Box component="form" sx={{ mt: 1, p: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              id="name"
              label="Modelo"
              placeholder="Exemplo: Gol"
              multiline
              variant="standard"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="board"
              label="Placa"
              placeholder="Exemplo: LUX9D35"
              multiline
              variant="standard"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setBoard(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="manufacturingDate"
              label="Ano de fabricação"
              type="date"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setManufacturingDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={false}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
