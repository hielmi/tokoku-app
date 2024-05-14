import { Dispatch, SetStateAction } from "react";
import styles from "./InputFile.module.scss";

type PropTypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
  className?: string;
};
const InputFile = (props: PropTypes) => {
  const { uploadedImage, name, setUploadedImage, className } = props;
  return (
    <div className={`${styles.file} ${className}`}>
      <label className={styles.file__label} htmlFor={name}>
        {uploadedImage?.name ? (
          <p>{uploadedImage?.name}</p>
        ) : (
          <>
            <p>
              Upload a product image, Larger than Image will be resized
              automatically
            </p>
            <p>
              Maximum upload size is <b>1 MB</b>
            </p>
          </>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className={styles.file__input}
        onChange={(e) => {
          setUploadedImage(e.target.files![0]);
        }}
      />
    </div>
  );
};

export default InputFile;
