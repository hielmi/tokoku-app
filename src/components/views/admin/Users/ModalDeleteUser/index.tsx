import styles from "./ModalDeleteUser.module.scss";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";

import { User } from "@/type/user.type";
import { Dispatch, SetStateAction, useState } from "react";

type PropTypes = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<any>>;
  setUserData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{ varian: string; message: string }>>;
  session: any;
};

const ModalDeleteUser = (props: PropTypes) => {
  const { deletedUser, setDeletedUser, setUserData, setToaster, session } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await userServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
      setToaster({
        varian: "success",
        message: "success deleted user",
      });
      setIsLoading(false);
    } else {
      setToaster({
        varian: "danger",
        message: "failed deleted role",
      });
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div className={styles.modal__content}>
        <h1 className={styles.modal__content__title}>Are you sure? </h1>
        <Button type="button" variant="danger" onClick={handleDelete}>
          {isLoading ? "Deleting..." : "Yes, delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
