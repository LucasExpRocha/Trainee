import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";

import { useQuery } from "../../../utils/graphql";
import { Create } from "../../../Components/Create";
import { gql } from "graphql-request";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
  const { data } = useQuery(QUERY);

  const [loading, setLoading] = useState(false);

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
                {data!.findAllCar.map(
                  ({ id, name, licensePlate, manufactureDate }: any) => (
                    <TableRow key={id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{licensePlate}</TableCell>
                      <TableCell>{manufactureDate.split('-').reverse().join('/')}</TableCell>
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
                        <a
                          href={`https://graphql-fiore.herokuapp.com/pdf/${id}`}
                          target="_blank"
                        >
                          <LoadingButton
                            color="secondary"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                          >
                            PDF
                          </LoadingButton>
                        </a>
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
