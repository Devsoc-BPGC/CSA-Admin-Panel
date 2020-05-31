import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Import Campus picture
import Campus from "../assets/img/campus.jpg";
// Firebase authentication
import * as firebase from "firebase/app";
// Importing auth and firestore
import "firebase/auth";
import "firebase/firestore";

// Firebase project Configuration
const firebaseConfig = {
  apiKey: "AIzaSyATjcR_5F98ADo3iY5ZxgpcBSbMX4Z_M34",
  authDomain: "csa-app-41a53.firebaseapp.com",
  databaseURL: "https://csa-app-41a53.firebaseio.com",
  projectId: "csa-app-41a53",
  storageBucket: "csa-app-41a53.appspot.com",
  messagingSenderId: "796324132621",
  appId: "1:796324132621:web:e5a858cb09ca3eb2a1e244",
  measurementId: "G-QT2TLBEY8V",
};

// Initialising Firebase
firebase.initializeApp(firebaseConfig);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Made with "} <span style={{ color: "#F74933" }}>&#x2764;</span> {" by "}
      <Link
        color="inherit"
        href="https://devsoc.club/"
        target="noopener noreferrer"
      >
        {"DevSoc"}
      </Link>
    </Typography>
  );
}

const handleLogin = () => {
  console.log("hey");
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // Google access token to access Google API
      var token = result.credential.accessToken;
      console.log(token);
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      // ...
    });
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  copyright: {
    bottom: "0",
    marginTop: "55vh",
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img src={Campus} alt="campus" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login with Google
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            <Box className={classes.copyright}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
