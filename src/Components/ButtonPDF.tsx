import { useState } from "react"
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import { gql, request } from "graphql-request";
import { routesBackend } from "../routes/backEnd.routes"

export function ButtonPDF({ id, name }: any) {
  const endpoint = routesBackend()
  const [loading, setLoading] = useState(false)

  async function findPDF(carId: string | undefined, name: string | undefined) {
    setLoading(true)
    const query = gql`
    query {
      generatePdfABase64(id: ${carId})
    }`;
    const res = await request(endpoint, query).then(
      (response) => response.generatePdfABase64
    );
    setLoading(false)
    const a = document.createElement("a");
    a.href = `data:application/pdf;base64,${res}`;
    a.download = `${name}.pdf`;
    a.click();
  }

  return (
    <LoadingButton
      color="secondary"
      loadingPosition="start"
      startIcon={<SaveIcon />}
      variant="contained"
      loading={loading}
      onClick={(e: any) => {
        e.preventDefault();
        findPDF(id, name);
      }}
    >
      PDF
    </LoadingButton>
  );
}
