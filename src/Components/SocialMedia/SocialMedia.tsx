import { FC } from "react";
import styles from "./SocialMedia.module.scss";
import { Instagram, Twitter, Facebook } from "@mui/icons-material";
import { ISocilaMedia } from "../../Interfaces/SocilaMedia";
import { Link } from "react-router-dom";

const SocialMedia: FC<ISocilaMedia> = ({ instagram, facebook, twitter }) => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.icons}>
          <Link to={instagram}>
            <Instagram
              sx={{
                color: "white",
                display: "flex",
                fontSize: "25px",
                cursor: "pointer",
              }}
            />
          </Link>
          <Link to={twitter}>
            <Twitter
              sx={{
                color: "white",
                display: "flex",
                fontSize: "25px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          </Link>
          <Link to={facebook}>
            <Facebook
              sx={{
                color: "white",
                display: "flex",
                fontSize: "25px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SocialMedia;
