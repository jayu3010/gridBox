import {
  Modal,
  TextField,
  FormLabel,
  Button,
  Grid,
  Slide,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';

import React, { useState } from "react";
import "./index.css";
import axios from "axios";
const GridComponent = () => {
  const [gridFirstOpen, setGridFirstOpen] = useState(false);
  const [gridSecOpen, setGridSecOpen] = useState(false);
  const [gridThirdOpen, setGridThirdOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });
  let isValid = true;
  const handlePost = () => {
    if (formIsValid()) {
      isValid = true;
    }
    console.log("isValid", isValid);
    try {
      if (isValid) {
        let body = {
          fname: userData.fname,
          lname: userData.lname,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
          gender: userData.gender,
        };
        console.log("bodybody", body);
        axios
          .post("https://gridboxtask.herokuapp.com/api/users/adduser", body)
          .then((res) => {
            toast.success(res?.data?.msg)
            setUserData({});
            isValid = true;
            setGridFirstOpen(false);
            setGridSecOpen(false);
            setGridThirdOpen(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  function formIsValid() {
    const _errors = {};
    if (
      (!/^[^-\s][a-zA-Z0-9_\s-]+$/.test(userData.fname) ||
        userData.fname == "" ||
        userData.fname == null) &&
      gridFirstOpen
    ) {
      isValid = false;
      _errors.fname = "First Name is required";
    } else if (
      (!/^[^-\s][a-zA-Z0-9_\s-]+$/.test(userData.lname) ||
        userData.lname == "" ||
        userData.lname == null) &&
      gridFirstOpen
    ) {
      isValid = false;
      _errors.lname = "Last Name is required";
    }
    if (gridSecOpen && (userData.email === "" || userData.email == null)) {
      isValid = false;
      _errors.email = "Email is required";
    } else if (
      gridSecOpen &&
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        userData.email
      )
    ) {
      isValid = false;
      _errors.email = "Please enter valid Email";
    } else if (gridSecOpen && (userData.password === "" || userData == null)) {
      isValid = false;
      _errors.password = "password is required";
    }
    if (gridThirdOpen && (userData.phone === "" || userData.phone === null)) {
      isValid = false;
      _errors.phone = "Phone Number is required";
    } else if (
      gridThirdOpen &&
      !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(userData.phone)
    ) {
      isValid = false;
      _errors.phone = "Please enter valid Phone number";
    } else if (
      gridThirdOpen &&
      (userData.gender === "" || userData.gender === null)
    ) {
      isValid = false;
      _errors.gender = "Gender is required";
    }
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const genderValue = [
    {
      male: "Male",
      female: "Female",
    },
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "cursive",
          padding: "30px 0",
        }}
      >
        <span className="title"> User Details</span>
      </div>

      <div className="grid-container">
        <Grid>
          <Grid
            onClick={() => {
              setGridFirstOpen(!gridFirstOpen);
            }}
            className="grid"
          >
            Grid 1
          </Grid>

          <Modal
            TransitionComponent={Transition}
            open={gridFirstOpen}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItem: "center",
                justifycontent: "center",
                flexDirection: "column",
                rowGap: "20px",
                padding: "30px",
                backgroundColor: "white",
                width: "400px",
                borderRadius:"10px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>Grid 1 Data</h5>
                <Button
                  style={{ backgroundColor: "violet", color: "white" }}
                  onClick={() => {
                    setGridFirstOpen(false);
                    setErrors({});
                  }}
                >
                  X
                </Button>
              </div>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                name="fname"
                onChange={(e) =>
                  setUserData({ ...userData, fname: e.target.value })
                }
              />
              {errors.fname && <p style={{ color: "red" }}> {errors.fname}</p>}
              <TextField
                id="outlined-basic"
                name="lname"
                label="Last Name"
                variant="outlined"
                onChange={(e) =>
                  setUserData({ ...userData, lname: e.target.value })
                }
              />
              {errors.lname && <p style={{ color: "red" }}> {errors.lname}</p>}
              <Button
                variant="contained"
                className="save-btn"
                onClick={handlePost}
              >
                Save
              </Button>
            </div>
          </Modal>
        </Grid>
        <Grid>
          <Grid
            onClick={() => {
              setGridSecOpen(!gridSecOpen);
            }}
            className="grid"
          >
            <FormLabel style={{ color: "white" }}>Grid 2</FormLabel>
          </Grid>
          <Modal
            open={gridSecOpen}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItem: "center",
                justifycontent: "center",
                flexDirection: "column",
                rowGap: "20px",
                padding: "30px",
                backgroundColor: "white",
                width: "400px",
                

              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>Grid 2 Data</h5>
                <Button
                  style={{ backgroundColor: "violet", color: "white" }}
                  onClick={() => {
                    setGridSecOpen(!gridSecOpen);
                    setErrors({});
                  }}
                >
                  X
                </Button>
              </div>

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                type={"email"}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              {errors.email && <p style={{ color: "red" }}> {errors.email}</p>}

              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              {errors.password && (
                <p style={{ color: "red" }}> {errors.password}</p>
              )}

              <Button
                variant="contained"
                className="save-btn"
                onClick={handlePost}
              >
                Save
              </Button>
            </div>
          </Modal>
        </Grid>
        <Grid>
          <Grid
            onClick={() => {
              setGridThirdOpen(!gridThirdOpen);
            }}
            className="grid"
          >
            Grid 3
          </Grid>
          <Modal
            open={gridThirdOpen}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItem: "center",
                justifycontent: "center",
                flexDirection: "column",
                rowGap: "20px",
                padding: "30px",
                backgroundColor: "white",
                width: "400px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>Grid 3 Data</h5>
                <Button
                  style={{ backgroundColor: "violet", color: "white" }}
                  onClick={() => {
                    setGridThirdOpen(!gridThirdOpen);
                    setErrors({});
                  }}
                >
                  X
                </Button>
              </div>
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                name="phone"
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
              {errors.phone && <p style={{ color: "red" }}> {errors.phone}</p>}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userData.gender}
                    label="Gender"
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {errors.gender && (
                <p style={{ color: "red" }}> {errors.gender}</p>
              )}

              <Button
                variant="contained"
                className="save-btn"
                onClick={handlePost}
              >
                Save
              </Button>
            </div>
          </Modal>
        </Grid>
      </div>
    </>
  );
};

export default GridComponent;
