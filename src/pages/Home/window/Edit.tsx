import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";

import { useEditCar } from "../../../hooks/useEditCar";
import { useDeleteCar } from "../../../hooks/useDeleteCar";
import { useFindCarByID } from "../../../hooks/useFindCarByID";
import { routesBackend } from "../../../routes/backEnd.routes";
import { ImageCarBase64 } from "../../../assets/ImageCar";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 0,
};

export const EditCar = (props: any) => {
  const [avatar, setAvatar] = useState(ImageCarBase64);

  const navigate = useNavigate();
  const route = routesBackend();
  const { id } = useParams();
  const [car, setCar] = useState({
    id: "",
    name: "",
    licensePlate: "",
    manufactureDate: "",
    imageCarBase64: "",
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

  async function handleChangeAvatar(event: any) {
    const file = event.target.files[0];

    let base64: any;
    base64 = await convertToBase64(file);

    setCar({...car, imageCarBase64: base64})
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

  const { data } = useFindCarByID(id);
  useEffect(() => {
    if (data) {
      setCar(data);
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
          <Grid container spacing={2} rowSpacing={2} alignItems="center">
            <Grid container item xs={4}>
              <Grid sx={{ position: "relative" }}>
                <InputLabel htmlFor="photo">
                  <Grid>
                    <Avatar
                      alt="CarImage"
                      src={car.imageCarBase64}
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
                  defaultValue={data.name}
                />
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
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
                    defaultValue={data.licensePlate}
                  />
                </Grid>
                <Grid item xs={6}>
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
                    defaultValue={data.manufactureDate}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Salvar
                  </Button>
                </Grid>
                <Grid item xs={6}>
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
            </Grid>
          </Grid>
        </Box>
      )}
    </Paper>
  );
};
