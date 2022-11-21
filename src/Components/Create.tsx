import { useState, FormEvent } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useMutation, gql } from "@apollo/client";

const CREATE_CAR = gql`
  mutation ($car: CarInput) {
    createCar(car: $car) {
      id
      name
      licensePlate
      manufactureDate
      version
    }
  }
`;

export const Create = () => {
  const [car, setCar] = useState({
    name: "",
    licensePlate: "",
    manufactureDate: "",
  });

  const [createCar] = useMutation(CREATE_CAR);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!car.name) {
      return;
    }

    await createCar({
      variables: {
        car,
      },
    });

    alert("Criado com sucesso!");
  }

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
              onChange={(e) => setCar({ ...car, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="licensePlate"
              label="Placa"
              placeholder="Exemplo: LUX9D35"
              multiline
              variant="standard"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setCar({ ...car, licensePlate: e.target.value })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="manufactureDate"
              label="Ano de fabricação"
              type="date"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setCar({ ...car, manufactureDate: e.target.value })
              }
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
