import React, { useRef, useState, useEffect, FC } from "react";
import styles from "./CreateShopItemForm.module.scss";
import { Alert, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "../../axiosAdmin";
import { imgLink } from "../../links";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useAppSelector } from "../../hooks/hooks";
import { selectIsAuth } from "../../Redux/Slices/authSlice";
import MenuIcon from "@mui/icons-material/Menu";
import Snack from "../Snack/Snack";

type TypeShopItem = {
  name?: string;
  category?: string;
  price?: number;
  raiting?: number;
  info?: string;
  img?: File;
};

interface CreateShopItemForm {
  toggleDrawer?: () => void;
}

const CreateShopItemForm: FC<CreateShopItemForm> = ({ toggleDrawer }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const isAuth = useAppSelector((state) => selectIsAuth(state));
  const [imgError, setImgError] = useState<boolean>(false);
  const [imageErrorText, setImageErrorText] = useState<string | null>(null);
  const [fileError, setFileError] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSnackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMessage, setMessage] = useState<string>("");

  const onClose = () => {
    setOpen(false);
  };

  const onClickRef = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }

    if (id) {
      setEdit(true);
    }
  }, []);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (file?.type.includes("image")) {
        formData.append("image", file);
        const { data } = await axios.post("/upload", formData);
        setImgUrl(data.url);
      } else {
        console.log("File not image");
        setFileError(true);
        setOpen(true);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error);
        setImageErrorText(error.response.data.message);
        setOpen(true);
      } else {
        console.error("Error:", error);
      }
    }
  };
  const isImageSelected = () => {
    if (imgUrl === null) {
      setImgError(true);
    }
  };

  const deleteImage = async () => {
    if (imgUrl) {
      try {
        await axios.delete(`/upload/${imgUrl}`);
        setImgUrl(null);
      } catch (error) {
        console.log("Error deleting file", error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypeShopItem>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TypeShopItem> = async (values) => {
    const params = {
      ...values,
      img: imgUrl,
    };
    try {
      if (isEdit) {
        const { data } = await axios.patch(`/shop-item/${id}`, params);
        if (data) {
          setMessage(data?.message);
          setSnackOpen(true);
          reset();
        }
      } else {
        const { data } = await axios.post("/shop-item", params);
        if (data) {
          navigate(`/shop/shop-item/${data.id}`);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <Snack
        isOpen={isSnackOpen}
        onClose={() => setSnackOpen(false)}
        text={snackMessage}
        type="info"
      />
      <ModalWindow
        btnStyle="primary"
        btnText="Ok"
        isOpen={isOpen}
        onClose={onClose}
        title={fileError ? "File not image" : imageErrorText}
        type={fileError ? "fileNotImage" : "imageError"}
      />
      {isEdit && (
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <Tooltip title="" onClick={toggleDrawer}>
            <IconButton>
              <MenuIcon
                sx={{ fontSize: "40px", cursor: "pointer", color: "#000" }}
              />
            </IconButton>
          </Tooltip>
        </div>
      )}

      <div className={styles.container}>
        <p className={styles.title}>
          {isEdit ? "Edit shop item" : "Create new shop item"}
        </p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.imgPreview}>
            {imgUrl && (
              <img
                className={styles.image}
                src={imgLink + imgUrl + `?${Date.now()}`}
                alt="Selected"
              />
            )}
          </div>
          <div className={styles.inputs}>
            <TextField
              className={styles.input}
              label="Name"
              id="filled-size-small"
              variant="filled"
              size="small"
              {...register(
                "name",
                isEdit ? { required: false } : { required: true }
              )}
            />
            {errors.name && (
              <Alert
                sx={{ marginTop: "15px", maxWidth: "250px" }}
                severity="error"
              >
                Enter product name
              </Alert>
            )}
          </div>
          <div className={styles.inputs}>
            <TextField
              className={styles.input}
              label="Category"
              id="filled-size-small"
              variant="filled"
              size="small"
              {...register(
                "category",
                isEdit ? { required: false } : { required: true }
              )}
            />
            {errors.category && (
              <Alert
                sx={{ marginTop: "15px", maxWidth: "250px" }}
                severity="error"
              >
                Enter product category
              </Alert>
            )}
          </div>
          <div className={styles.inputs}>
            <TextField
              className={styles.input}
              label="Price"
              id="filled-size-small"
              variant="filled"
              size="small"
              type="number"
              {...register(
                "price",
                isEdit ? { required: false } : { required: true }
              )}
            />
            {errors.price && (
              <Alert
                sx={{ marginTop: "15px", maxWidth: "250px" }}
                severity="error"
              >
                Enter product price
              </Alert>
            )}
          </div>
          <div className={styles.inputs}>
            <TextField
              className={styles.input}
              label="Rating"
              id="filled-size-small"
              variant="filled"
              size="small"
              type="number"
              {...register(
                "raiting",
                isEdit ? { required: false } : { required: true }
              )}
            />
            {errors.raiting && (
              <Alert
                sx={{ marginTop: "15px", maxWidth: "250px" }}
                severity="error"
              >
                Enter product raiting
              </Alert>
            )}
          </div>
          <div className={styles.inputs}>
            <TextField
              className={styles.input}
              id="filled-multiline-static"
              label="Info"
              multiline
              rows={4}
              variant="filled"
              {...register(
                "info",
                isEdit ? { required: false } : { required: true }
              )}
            />
            {errors.info && (
              <Alert
                sx={{ marginTop: "15px", maxWidth: "250px" }}
                severity="error"
              >
                Enter product info
              </Alert>
            )}
          </div>
          <div className={styles.buttons}>
            <Button
              sx={{ marginRight: "10px" }}
              onClick={() => {
                onClickRef();
              }}
              variant="outlined"
            >
              Upload image
            </Button>
            {imgError && (
              <Alert
                sx={{
                  marginTop: "15px",
                  maxWidth: "250px",
                }}
                severity="error"
              >
                Select image
              </Alert>
            )}
            {imgUrl && (
              <Button
                onClick={() => {
                  deleteImage();
                }}
                variant="outlined"
                color="error"
              >
                Delete image
              </Button>
            )}
            <input
              onChange={onImageChange}
              ref={inputRef}
              hidden
              type="file"
              name="image"
              id="image"
            />
          </div>
          {isEdit ? (
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
          ) : (
            <Button
              onClick={() => {
                isImageSelected();
              }}
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateShopItemForm;
