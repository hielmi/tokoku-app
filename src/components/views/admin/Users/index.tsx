import styles from "./Users.module.scss";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import ModalUpdateUser from "@/components/views/admin/Users/ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";

type PropTypes = {
  users: any;
  setToaster?: any;
};

const UsersAdminView = (props: PropTypes) => {
  const [UpdateUser, setUpdateUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>([]);
  const [userData, setUserData] = useState<any>([]);
  const { users, setToaster } = props;

  useEffect(() => {
    setUserData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1>User Management</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user: any, index: number) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role === "admin" ? "Admin" : "Member"}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button type="button" onClick={() => setUpdateUser(user)}>
                        <i className="bx bxs-edit" />
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => setDeletedUser(user)}
                      >
                        <i className="bx bxs-trash" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(UpdateUser).length > 0 && (
        <ModalUpdateUser
          modalUpdateUser={UpdateUser}
          setModalUpdateUser={setUpdateUser}
          setUserData={setUserData}
          setToaster={setToaster}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deleteUser={deletedUser}
          setDeleteUser={setDeletedUser}
          setUserData={setUserData}
          setToaster={setToaster}
        />
      )}
    </>
  );
};

export default UsersAdminView;
