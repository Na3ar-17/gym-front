import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./AdminLogin.module.scss";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { TypeLogin } from "../../Types/Login";
import { Alert, Button, Container, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchLoginAdmin, selectIsAdmin } from "../../Redux/Slices/adminSlice";
import { Navigate } from "react-router-dom";
import { setSnackOpen, setSnackText } from "../../Redux/Slices/appSlice";
const AdminLogin: FC = () => {
  const isAdmin = useAppSelector((state) => selectIsAdmin(state));
  const dispatch = useAppDispatch();
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
    dispatch(setSnackText("Welcome to Admin account"));
  };

  const onSubmit: SubmitHandler<TypeLogin> = async (values) => {
    const data = await dispatch(fetchLoginAdmin(values));

    if (!data.payload) {
      reset();
      alert("Error");
    }

    if ("adminToken" in data.payload) {
      window.localStorage.setItem("adminToken", data.payload.adminToken);
    }

    setSnackData();
    reset();
  };

  if (isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header isDark={true} />
      <div className={styles.container}>
        <Container maxWidth="lg">
          <p className={styles.title}>Admin </p>

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
                {errors.email && (
                  <Alert
                    sx={{ marginTop: "15px", maxWidth: "250px" }}
                    severity="error"
                  >
                    Please enter Email
                  </Alert>
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
                {errors.password && (
                  <Alert
                    sx={{ marginTop: "15px", maxWidth: "250px" }}
                    severity="error"
                  >
                    Please enter Password
                  </Alert>
                )}
              </div>

              <Button
                className={styles.button}
                type="submit"
                sx={{ marginTop: "20px", width: "200px", height: "50px" }}
                variant="contained"
              >
                Log In
              </Button>
            </form>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
