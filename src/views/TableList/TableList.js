import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ModalButton from "components/CustomButtons/Button.js";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #aaa",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
}));

export default function TableList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    title: "",
    description: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const onSubmitChange = (e) => {
    console.log(values);
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        body: values,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [posts, setPosts] = useState([]);
  const fetchResponse = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(response);
    setPosts(response.data);
    setPosts(response.data);
    setPosts(response.data);
  };
  useEffect(() => {
    fetchResponse();
  }, []);
  console.log(posts);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Events & Notices </h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Description", "Author", "Date", "Time"]}
              tableData={[
                ["Dakota Plums", "Skartov", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <Grid container justify="center">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add a new Event
        </Button>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add new Event/Notice</h2>
            <p id="transition-modal-description">
              <form onSubmit={onSubmitChange()}>
                <TextField
                  id="standard-full-width"
                  label="Title"
                  style={{ margin: 8 }}
                  placeholder="Add Event/Notice Title"
                  fullWidth
                  margin="normal"
                  onChange={handleChange("title")}
                />
                <TextField
                  id="standard-textarea"
                  label="Description"
                  style={{ margin: 8 }}
                  placeholder="Add Event/Notice Description"
                  fullWidth
                  multiline
                  rows={8}
                  margin="normal"
                  onChange={handleChange("description")}
                />
                <Box m={2} pt={3}>
                  <Grid container justify="flex-end">
                    <ModalButton
                      type="button"
                      color="primary"
                      style={{ margin: 8 }}
                      margin="normal"
                      onClick={onSubmitChange}
                    >
                      Okay
                    </ModalButton>
                    <ModalButton
                      type="button"
                      color="danger"
                      style={{ margin: 8 }}
                      margin="normal"
                      onClick={handleClose}
                    >
                      Cancel
                    </ModalButton>
                  </Grid>
                </Box>
              </form>
            </p>
          </div>
        </Fade>
      </Modal>
    </GridContainer>
  );
}
