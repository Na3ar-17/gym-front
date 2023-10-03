import Header from "../../Components/Header/Header";
import styles from "./Register.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { TypeRegister } from "../../Types/Register";
import { Alert, Button, Container, TextField } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchRegistration, selectIsAuth } from "../../Redux/Slices/authSlice";
import { Link, Navigate } from "react-router-dom";
import { setSnackOpen, setSnackText } from "../../Redux/Slices/appSlice";
import { useState } from "react";

const Register = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => selectIsAuth(state));
  const [fullNameError, setFullNameError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypeRegister>({
    mode: "onChange",
  });
  const setSnackData = () => {
    dispatch(setSnackOpen());
    dispatch(setSnackText("Registration successful"));
  };

  const onSubmit: SubmitHandler<TypeRegister> = async (values) => {
    const fullName = values.fullName || "";

    if (!/^(\S+\s{1}\S+)$/.test(fullName)) {
      setFullNameError(
        "Full Name should contain exactly two words separated by one space"
      );
      return;
    }

    const data = await dispatch(
      fetchRegistration({ ...values, fullName: fullName.trim() })
    );
    if (!data.payload) {
      return alert("Registration error");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }

    reset();
    setSnackData();
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header isDark={true} />

      <div className={styles.container}>
        <Container maxWidth="lg">
          <p className={styles.title}>Registration</p>

          <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.input}>
                <TextField
                  className={styles.TextField}
                  id="standard-basic"
                  label="Email"
                  variant="filled"
                  sx={{ width: "100%", fontSize: "22px" }}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <Alert
                    sx={{ marginTop: "15px", maxWidth: "250px" }}
                    severity="error"
                  >
                    Please enter your Email
                  </Alert>
                )}
              </div>
              <div className={styles.input}>
                <TextField
                  className={styles.TextField}
                  id="standard-basic"
                  label="Password"
                  variant="filled"
                  sx={{ width: "100%", fontSize: "42px" }}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <Alert
                    sx={{ marginTop: "15px", maxWidth: "250px" }}
                    severity="error"
                  >
                    {" "}
                    Please enter your Password
                  </Alert>
                )}
              </div>
              <div className={styles.input}>
                <TextField
                  className={styles.TextField}
                  id="standard-basic"
                  label="Full Name"
                  variant="filled"
                  sx={{ width: "100%", fontSize: "22px" }}
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <Alert
                    sx={{ marginTop: "15px", maxWidth: "250px" }}
                    severity="error"
                  >
                    Please enter your Full Name
                  </Alert>
                )}
                {fullNameError && (
                  <Alert
                    sx={{ marginTop: "15px", maxWidth: "250px" }}
                    severity="error"
                  >
                    {fullNameError}
                  </Alert>
                )}
              </div>
              <Button
                className={styles.button}
                type="submit"
                sx={{ marginTop: "50px", width: "200px", height: "50px" }}
                variant="contained"
              >
                Registration
              </Button>
            </form>
            <Link to="/login">
              <p style={{ marginTop: "30px" }}>Back to login</p>
            </Link>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Register;
