import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useEditCar } from "../../../hooks/useEditCar";
import { useDeleteCar } from "../../../hooks/useDeleteCar";
import { useFindCarByID } from "../../../hooks/useFindCarByID";
import { routesBackend } from "../../../routes/backEnd.routes"

export const EditCar = (props: any) => {
  const navigate = useNavigate();
  const route = routesBackend()
  const { id } = useParams();
  const [car, setCar] = useState({
    id: "",
    name: "",
    licensePlate: "",
    manufactureDate: "",
    version: 0,
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!car.name) {
      return;
    }

    useEditCar(car, route);
    alert("Os dados foram alterados com sucesso!");
    navigate(-1);
  }

  async function handleDeleteCar() {
    const response = await useDeleteCar(id, route);
    alert(response);
    navigate(-1);
  }

  const { data } = useFindCarByID(id);
  useEffect(() => {
    if (data) {
      setCar({
        id: data.id,
        name: data.name,
        licensePlate: data.licensePlate,
        manufactureDate: data.manufactureDate,
        version: data.version,
      });
    }
  }, [data]);

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Editar
      </Typography>
      {!data ? (
        <Box sx={{ display: "flex" }} className="flex--centro">
          <CircularProgress className="flex--centro" />
        </Box>
      ) : (
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
                defaultValue={data.name}
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
                defaultValue={data.licensePlate}
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
                defaultValue={data.manufactureDate}
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
                onClick={(e: any) => {
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
