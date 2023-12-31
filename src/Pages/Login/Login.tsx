import Header from "../../Components/Header/Header";
import styles from "./Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { TypeLogin } from "../../Types/Login";
import { Alert, Button, Container, TextField } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import { fetchLogin, selectIsAuth } from "../../Redux/Slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link, Navigate } from "react-router-dom";
import { setSnackOpen, setSnackText } from "../../Redux/Slices/appSlice";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import { useState } from "react";

const Login = () => {
  const isAuth = useAppSelector((state) => selectIsAuth(state));
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypeLogin>({
    mode: "onChange",
  });
  const setSnackData = () => {
    dispatch(setSnackOpen());
    dispatch(setSnackText("Login successful"));
  };

  const onSubmit: SubmitHandler<TypeLogin> = async (values) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      openModal();
      reset();
      return;
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
      <ModalWindow
        isOpen={isModalOpen}
        onClose={closeModal}
        type="errorAuth"
        btnStyle="error"
        btnText="Ok"
        title="Error Login"
      />
      <Header isDark={true} />

      <div className={styles.container}>
        <Container maxWidth="lg">
          <p className={styles.title}>Login</p>

          <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.input}>
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="filled"
                  sx={{ width: "100%", fontSize: "22px" }}
                  {...register("email", { required: true })}
                />
                {errors.email ? (
                  <Alert
                    sx={{ marginTop: "15px", maxWidth: "250px" }}
                    severity="error"
                  >
                    Please enter your Email
                  </Alert>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.input}>
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="filled"
                  sx={{ width: "100%", fontSize: "42px" }}
                  {...register("password", { required: true })}
                />
                {errors.password ? (
                  <Alert
                    sx={{ marginTop: "15px", maxWidth: "250px" }}
                    severity="error"
                  >
                    {" "}
                    Please enter your Password
                  </Alert>
                ) : (
                  ""
                )}
              </div>
              <Button
                className={styles.button}
                type="submit"
                sx={{ marginTop: "50px", width: "200px", height: "50px" }}
                variant="contained"
              >
                Log In
              </Button>
            </form>
            <Link to="/register">
              <p style={{ marginTop: "30px" }}>Dont have account?</p>
            </Link>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Login;
