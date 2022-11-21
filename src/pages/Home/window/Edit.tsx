import { useState, useEffect, FormEvent } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useMutation, gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const CREATE_CAR = gql`
  mutation ($car: CarInput) {
    updateCar(car: $car) {
      id
      name
      licensePlate
      manufactureDate
      version
    }
  }
`;

export const EditCar = (props: any) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState({
    id: "",
    name: "",
    licensePlate: "",
    manufactureDate: "",
    version: 0,
  });
  
  const [updateCar] = useMutation(CREATE_CAR);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if (!car.name) {
      return;
    }

    await updateCar({
      variables: {
        car,
      },
    });

    navigate(-1);
  }

  const DELETE_CAR = gql`
    mutation {
      deleteCar(id: ${id})
    }
  `;
  const [deleteCar, ] = useMutation(DELETE_CAR); 

  async function handleDeleteCar() {
    await deleteCar();
    navigate(-1);
  }

  const { data } = useQuery(gql`
    query{
        findCarById(id: ${id}){
          id
          name
          licensePlate
          manufactureDate
          version
        }
      }
  `);

  useEffect(() => {
    if (data) {
      setCar({
        id: data.findCarById.id,
        name: data.findCarById.name,
        licensePlate: data.findCarById.licensePlate,
        manufactureDate: data.findCarById.manufactureDate,
        version: data.findCarById.version,
      });
    }
  }, [data]);

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Editar
      </Typography>
      {data && (
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
                defaultValue={data.findCarById.name}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="licensePlate"
                label="Placa"
                placeholder="Exemplo: LUX9D35"
                multiline
                variant="standard"
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setCar({ ...car, licensePlate: e.target.value })
                }
                defaultValue={data.findCarById.licensePlate}
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
                defaultValue={data.findCarById.manufactureDate}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Salvar
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                color="error"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  e.preventDefault();
                  const Confirm = confirm("Deseja realmente deletar?");
                  return Confirm ? handleDeleteCar() : null;
                }}
              >
                Deletar
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Paper>
  );
};
