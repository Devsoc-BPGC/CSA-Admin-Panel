import React from "react";
import Avatar from "@material-ui/core/Avatar";
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
import axios from "axios";
import GoogleLogin from "react-google-login";
// Admin page
import Admin from "./Admin";

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
  welcome: {
    width: "100%",
    marginTop: theme.spacing(2),
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    width: "100%",
    margin: "auto",
  },
  copyright: {
    bottom: "0",
    marginTop: "30vh",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    setEmail(response.profileObj.email);
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/",
      data: JSON.stringify({
        email: email,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res);

        setIsLoggedIn(true);
        window.location.href = "/admin/dashboard";
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(true);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <>
        {isLoggedIn ? (
          <Admin style={{ width: "100%" }} />
        ) : (
          <>
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
              <img src={Campus} alt="campus" />
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography
                  component="h3"
                  variant="h3"
                  className={classes.welcome}
                >
                  Welcome to the <p>CSA Admin Panel</p>
                </Typography>
                <form className={classes.form}>
                  <GoogleLogin
                    clientId="604242605681-v60kba2hglvtnspec2mtbacta51r64mp.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className={classes.submit}
                  />
                  <Box className={classes.copyright}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </>
        )}
      </>
    </Grid>
  );
}
