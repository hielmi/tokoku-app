import styles from "./ModalDeleteUser.module.scss";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";

const ModalDeleteUser = (props: any) => {
  const { deleteUser, setDeleteUser, setUserData } = props;

  const handleDelete = async () => {
    const result = await userServices.deleteUser(deleteUser.id);
    if (result.status === 200) {
      setDeleteUser({});
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
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
