import styles from "./ModalDeleteUser.module.scss";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";
import { useSession } from "next-auth/react";

const ModalDeleteUser = (props: any) => {
  const { deleteUser, setDeleteUser, setUserData, setToaster } = props;

  const session: any = useSession();
  const handleDelete = async () => {
    const result = await userServices.deleteUser(
      deleteUser.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setDeleteUser({});
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
      setToaster({
        varian: "success",
        message: "success deleted user",
      });
    } else {
      setToaster({
        varian: "danger",
        message: "failed deleted role",
      });
    }
  };

  return (
    <Modal onClose={() => setDeleteUser({})}>
      <div className={styles.modal__content}>
        <h1 className={styles.modal__content__title}>Are you sure? </h1>
        <Button type="button" variant="danger" onClick={handleDelete}>
          Detele
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
