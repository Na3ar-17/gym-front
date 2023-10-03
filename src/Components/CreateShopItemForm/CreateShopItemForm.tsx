import React, { useRef, useState } from "react";
import styles from "./CreateShopItemForm.module.scss";
import { Alert, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "../../axiosAdmin";
import { imgLink } from "../../links";
import { useNavigate } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";

type TypeShopItem = {
  name: string;
  category: string;
  price: number;
  raiting: number;
  info: string;
  img: File;
};

const CreateShopItemForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState<boolean>(false);
  const [imageErrorText, setImageErrorText] = useState<string | null>(null);
  const [fileError, setFileError] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClose = () => {
    setOpen(false);
  };

  const onClickRef = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

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
  } = useForm<TypeShopItem>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TypeShopItem> = async (values) => {
    try {
      const params = {
        ...values,
        img: imgUrl,
      };
      const { data } = await axios.post("/shop-item", params);

      if (data) {
        navigate(`/shop/shop-item/${data.id}`);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <ModalWindow
        btnStyle="primary"
        btnText="Ok"
        isOpen={isOpen}
        onClose={onClose}
        title={fileError ? "File not image" : imageErrorText}
        type={fileError ? "fileNotImage" : "imageError"}
      />
      <div className={styles.container}>
        <p className={styles.title}>Create new shop item</p>
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
              {...register("name", { required: true })}
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
              {...register("category", { required: true })}
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
              {...register("price", { required: true })}
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
              {...register("raiting", { required: true })}
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
              {...register("info", { required: true })}
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

          <Button
            onClick={() => {
              isImageSelected();
            }}
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateShopItemForm;
