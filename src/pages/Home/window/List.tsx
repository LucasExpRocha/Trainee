import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { Link } from "react-router-dom";
import { gql, request } from "graphql-request";

import { ButtonPDF } from "../../../Components/ButtonPDF";
import { useFindListCars } from "../../../hooks/useFindListCars";
import { Create } from "../../../Components/Create";

const QUERY = gql`
  query {
    findAllCar {
      id
      name
      licensePlate
      manufactureDate
      version
    }
  }
`;

export const ListCars = () => {
  const { data } = useFindListCars(QUERY);

  return (
    <>
      <Create />
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography
            component="h2"
            variant="h5"
            color="secondary"
            gutterBottom
          >
            Listagem
          </Typography>
          {!data ? (
            <Box sx={{ display: "flex" }} className="flex--centro">
              <CircularProgress className="flex--centro" />
            </Box>
          ) : (
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Carro</TableCell>
                  <TableCell>Placa</TableCell>
                  <TableCell>Fabricação</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">PDF</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(
                  ({ id, name, licensePlate, manufactureDate }: any) => (
                    <TableRow key={id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{licensePlate}</TableCell>
                      <TableCell>
                        {manufactureDate.split("-").reverse().join("/")}
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`edit/${id}`}>
                          <Button
                            variant="contained"
                            startIcon={<CreateIcon />}
                          >
                            EDIT
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <ButtonPDF id={id} name={name}/>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Grid>
    </>
  );
};
