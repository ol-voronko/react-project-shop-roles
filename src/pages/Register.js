import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import { Copyright } from "./Login";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFullRegister } from "../Thunks/actionFullRegister";
import { selectAuthError, selectAuthToken } from "../APIpages/selectors";
import { authSlice } from "../APIpages/api";

const defaultTheme = createTheme();

export const Register = () => {
  const token = useSelector(selectAuthToken);
  const error = useSelector(selectAuthError);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [nick, setNick] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(authSlice.actions.setAuthError(null));
    };
  }, []);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nick"
                  required
                  fullWidth
                  id="nick"
                  label="Nick"
                  autoFocus
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Login"
                  name="login"
                  autoComplete="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {error && <p className="text-error">{error}</p>}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) =>
                dispatch(actionFullRegister(login, password, nick))
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
