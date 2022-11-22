import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Link } from 'react-router-dom';

const theme = createTheme();

export function SelectBackEnd() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Selecione o seu Back-End
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Selecione o back-end para consumo.
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Clique em algum dos botões abaixo para selecionar o back-end desejado.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/salatiel/">
              <Button variant="contained">Salatiel</Button>
              </Link>
              <Link to="/leticia/">
              <Button variant="outlined">Leticia</Button>
              </Link>
              <Link to="/ivanildo/">
              <Button variant="contained">Ivanildo</Button>
              </Link>
              <Link to="/larissa/">
              <Button variant="outlined">Larissa</Button>
              </Link>
              <Link to="/juan/">
              <Button variant="contained">Juan</Button>
              </Link>

            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}