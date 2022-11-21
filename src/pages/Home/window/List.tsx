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
import { gql } from "graphql-request";


const QUERY = gql`
query {
  users {
    id
    name
    board
    manufacturingDate
  }
}
`;

import {Create} from "./Create"

export const ListCars = () => {
  const { data } = useQuery(QUERY);

  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }
  

  return (
    <>
    <Create/>
    <Grid item xs={12} sx={{mt: 2}}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h5" color="secondary" gutterBottom>
          Listagem
        </Typography>
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
          {data && 
            data!.users.map(({id, name, board, manufacturingDate}: any) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{board}</TableCell>
                <TableCell>{manufacturingDate}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" startIcon={<CreateIcon />}>
                    EDIT
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="secondary"
                    onClick={handleClick}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                  >
                    PDF
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
    </>
  );
};
