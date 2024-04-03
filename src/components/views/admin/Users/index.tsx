import styles from "./Users.module.scss";
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import ModalUpdateUser from "@/components/views/admin/Users/ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { User } from "@/type/user.type";
import { useSession } from "next-auth/react";

type PropTypes = {
  users: User[];
  setToaster?: any;
};

const UsersAdminView = (props: PropTypes) => {
  const [UpdateUser, setUpdateUser] = useState<User | {}>({});
  const [deletedUser, setDeletedUser] = useState<User | {}>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const { users, setToaster } = props;

  const session: any = useSession();

  useEffect(() => {
    setUserData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1 className={styles.users__title}>User Management</h1>
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
          updatedUser={UpdateUser}
          setUpdatedUser={setUpdateUser}
          setUserData={setUserData}
          setToaster={setToaster}
          session={session}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUserData={setUserData}
          setToaster={setToaster}
          session={session}
        />
      )}
    </>
  );
};

export default UsersAdminView;
