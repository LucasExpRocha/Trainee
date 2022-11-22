import { useState, FormEvent } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";

import { useCreateCar } from "../hooks/useCreateCar";
import { ImageCarBase64 } from "../assets/ImageCar";

import { routesBackend } from "../routes/backEnd.routes"

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 0,
};

export const Create = () => {
  const [avatar, setAvatar] = useState(ImageCarBase64);
  let route = routesBackend()

  const [car, setCar] = useState({
    name: "",
    licensePlate: "",
    manufactureDate: "",
  });

  async function handleChangeAvatar(event: any) {
    const file = event.target.files[0];

    let base64: any;
    base64 = await convertToBase64(file);

    setAvatar(base64);
  }

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!car.name) {
      return;
    }

    useCreateCar(car, route);

    alert("Criado com sucesso!");
  }

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Criar
      </Typography>
      <Box component="form" sx={{ mt: 1, p: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid sx={{ position: "relative" }}>
              <InputLabel htmlFor="photo" sx={{ position: "absolute" }}>
                <Grid>
                  <Avatar
                    alt="CarImage"
                    src={avatar}
                    sx={{ width: 200, height: 200 }}
                  />
                  <Fab
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    sx={fabStyle}
                  >
                    <AddIcon sx={{ position: "absolute" }} />
                    <InputBase
                      type="file"
                      id="photo"
                      inputProps={{
                        accept: "image/png, image/jpeg, image/jpg",
                        style: { opacity: "0" },
                      }}
                      onChange={handleChangeAvatar}
                    />
                  </Fab>
                </Grid>
              </InputLabel>
            </Grid>
          </Grid>
          <Grid container item xs={8} rowSpacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                label="Modelo"
                placeholder="Exemplo: Gol"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setCar({ ...car, name: e.target.value })}
              />
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs>
                <TextField
                  fullWidth
                  id="licensePlate"
                  label="Placa"
                  placeholder="Exemplo: LUX9D35"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    setCar({ ...car, licensePlate: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
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
            </Grid>
            <Grid item xs={12}>
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
        </Grid>
      </Box>
    </Paper>
  );
};
