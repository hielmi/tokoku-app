import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalAddProduct.module.scss";
import { Products } from "@/type/product.type";
import InputFile from "@/components/ui/InputFile";
import productServices from "@/services/product";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";

type PropTypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<any>>;
  setDataProducts: Dispatch<SetStateAction<Products[]>>;
};

const ModalAddProduct = (props: PropTypes) => {
  const { setModalAddProduct, setToaster, setDataProducts } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [StockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const session: any = useSession();

  const handleStock = (index: number, e: any, type: string) => {
    const copyStockCount: any = [...StockCount];
    copyStockCount[index][type] = parseInt(e.target.value);
    setStockCount(copyStockCount);
  };

  const uploadImage = async (id: string, form: any) => {
    const file = form.image.files[0];
    console.log(file);

    if (file) {
      const newName = "main__" + id + "." + file.type.split("/")[1];
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageUrl: any) => {
          if (status) {
            const data = {
              image: newImageUrl?.url,
            };

            const result = await productServices.updateProduct(
              id,
              data,
              session.data?.accessToken
            );

            if (result.status === 200) {
              setToaster({
                type: "success",
                message: "success add product",
              });
              setIsLoading(false);
              form.reset();
              const { data } = await productServices.getAllProducts();
              setDataProducts(data.data);
            }
          } else {
            setToaster({
              type: "danger",
              message: "failed to add product",
            });
            setIsLoading(false);
          }
        }
      );
    } else {
      setToaster({
        type: "success",
        message: "success add product",
      });
      setIsLoading(false);
      form.reset();
      const { data } = await productServices.getAllProducts();
      setDataProducts(data.data);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: any = e.target as HTMLFormElement;

    const data = {
      name: form.name.value,
      category: form.category.value,
      desc: form.desc.value,
      price: form.price.value,
      status: form.status.value,
      stock: StockCount,
      image: uploadedImage ? uploadedImage : "",
    };

    const result = await productServices.addProduct(
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      await uploadImage(result.data.data.id, form);
    } else {
      setToaster({
        type: "error",
        message: "Failed added product",
      });
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
        />
        <Select
          label="Category"
          name="category"
          option={[
            { label: "Men", value: "Men" },
            { label: "Women", value: "Women" },
          ]}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert product price"
        />
        <Select
          label="Status"
          name="status"
          option={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
        />

        <Input
          label="Description"
          name="desc"
          type="text"
          placeholder="Insert Description of Product"
        />
        <label htmlFor="image">Upload product image</label>
        <div className={styles.form__upload}>
          {uploadedImage ? (
            <Image
              src={uploadedImage ? URL.createObjectURL(uploadedImage) : ""}
              width={100}
              height={100}
              alt="product-image"
              className={styles.form__upload__image}
              objectFit="contain"
            />
          ) : (
            <div className={styles.form__upload__placeholder}>
              <p>No Image</p>
            </div>
          )}

          <InputFile
            name={"image"}
            setUploadedImage={setUploadedImage}
            uploadedImage={uploadedImage}
            className={styles.form__upload__input}
          />
        </div>
        <label htmlFor="stock">Stock</label>
        {StockCount.map(
          (item: { size: string; qty: number }, index: number) => {
            return (
              <div className={styles.form__stock} key={index}>
                <div className={styles.form__stock__item}>
                  <Input
                    label="Size"
                    name="size"
                    type="text"
                    placeholder="Insert product Size"
                    onChange={(e) => {
                      handleStock(index, e, "size");
                    }}
                  />
                </div>
                <div className={styles.form__stock__item}>
                  <Input
                    label="Qty"
                    name="qty"
                    type="number"
                    placeholder="Insert product Quantity"
                    onChange={(e) => {
                      handleStock(index, e, "qty");
                    }}
                  />
                </div>
                <div className={styles.form__stock__delete}>
                  <i
                    className="bx bx-x"
                    onClick={() => {
                      const copyStockCount: any = [...StockCount];
                      copyStockCount.splice(index, 1);
                      setStockCount(copyStockCount);
                    }}
                  />
                </div>
              </div>
            );
          }
        )}
        <Button
          type="button"
          className={styles.form__stock__button}
          onClick={() => setStockCount([...StockCount, { size: "", qty: 0 }])}
          variant="secondary"
        >
          <i className="bx bx-plus" />
        </Button>

        <Button
          type="submit"
          isDisabled={isLoading}
          className={styles.form__stock__submit}
        >
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
