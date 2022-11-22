import { useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import { gql, request } from "graphql-request";

export function ButtonPDF({ id, name }: any) {
  const [pdf, setPdf] = useState("");
  const endpoint = "https://graphql-fiore.herokuapp.com/graphql";

  async function findPDF(carId: string | undefined, name: string | undefined) {
    const query = gql`
    query {
      generatePdfABase64(id: ${carId})
    }`;
    const res = await request(endpoint, query).then(
      (response) => response.generatePdfABase64
    );
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
      onClick={(e) => {
        e.preventDefault();
        findPDF(id, name);
      }}
    >
      PDF
    </LoadingButton>
  );
}
