import React, { useEffect } from "react";
import "./styles.css";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, CardActions, CardContent, TextField } from "@material-ui/core";
import Box from '@material-ui/core/Box';

export default function App() {
  const [patients, setPatientsState] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState(0);
  const [isEditable, setIsEditable] = React.useState(false);
  const [prevOrdersData, setOrdersData] = React.useState([]);
  const [isReady, setIsReady] = React.useState(false);

  const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      opacity: '90%',
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      fontWeight: 'bold',
      transition: "0.1s cubic-bezier(.17, .67, .83, .67)",
      '&:hover': {
        background: "#fff",
        color: "rgb(39,39,39)",
        transform: "scale(1.1) translateY(-3px)",
        boxShadow: '0 3px 5px 2px rgba(232, 232, 232, .3)',
      },
    },
    cards: {
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%',
      overflow: 'true',
      margin: '0 30px',
    },
    flex: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-right",
      position: "absolute",
    },
    buttonSpacing: {
      mx: "auto",
      px: "auto",
      display: "flex",
    },
  });

  const classes = useStyles();
  
  async function getData(url) {
    const data = await fetch(url, { method: 'GET' })
      .then(res => {
        return res.json();
      }).catch((err) => {
        return err;
      });
    return data;
  };

  function updataData(url, data) {
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data),
      mode: 'cors',
    }).then((response) => {
      return response.json();
    }).catch((err) => {
      return err;
    });
  };

  useEffect(async () => {
    var loadedOrders = await getData('http://localhost:4000/juboProject/orders');
    var loadedPatients = await getData('http://localhost:4000/juboProject/patients');
    setOrdersData(loadedOrders);
    setPatientsState(loadedPatients);
    setIsReady(true);
  }, []);

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleClickOpen = (id) => {
    setIsOpen(true);
    setOrderId(id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const patientList = patients.map((patient, id) => (
    <div className="patientName">
      <Button className="patientButton" variant="outlined" size="large"
        classes={{
          root: classes.root,
          cardHovered: classes.root,
        }}
        key={id} onClick={() => handleClickOpen(id)}>
        {patient.Name}
      </Button>
    </div>
  ));

  if (!isReady) {
    return (<div>Loading..</div>);
  };

  return (
    <div className="App">
      <div class="card">
        <div class="card-header">
          <h1>Patient list and orders</h1>
        </div>
        <div class="card-body">
          <div className="patientList">
            {patientList}
          </div>
          <Dialog
            onClose={handleClose}
            open={isOpen}
            aria-labelledby="customized-dialog-title"
            fullWidth="true"
            maxWidth={'md'}
            fullHeight="80vh"
            maxHeight={'md'}
          >
            <Card className='card' variant="outlined"
              display="flex"
              flexDirection="row"
            >
              <CardActions
                classes={{
                  buttonPos: classes.buttonPos,
                }}
                position="absolute"
                right="2%"
              >
                <Grid container justify="flex-end" alignItems="flex-end">
                  <Box mx={1.5}>
                    <Button size="small"
                      variant="contained"
                      onClick={handleEdit}
                      color="primary"
                      startIcon={<EditIcon />}
                      style={{ top: 2, right: 2 }}
                    >
                      Edit
                  </Button>
                  </Box>
                </Grid>
              </CardActions>
              <CardContent>
                <Typography
                  className='cardContent'
                  color="textSecondary"
                  paragraph
                >
                  Editing orders for {patients[orderId].Name} ...
                  </Typography>
                <Box width="80%" fullWidth="true">
                  <TextField
                    key={orderId}
                    label={patients[orderId].Name}
                    disabled={!isEditable}
                    value={prevOrdersData[orderId].Message}
                    onChange={e => setOrdersData(prevOrdersData => {
                      var _prevOrdersData = prevOrdersData;
                      _prevOrdersData[orderId].Message = e.target.value;
                      updataData('http://localHost:4000/juboProject/orders', _prevOrdersData[orderId]);
                      return [..._prevOrdersData];
                    })}
                    fullWidth="true"
                    maxWidth={'mx'}
                    onBlur={() => setIsEditable(false)}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
