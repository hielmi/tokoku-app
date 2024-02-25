import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { User } from "@/type/user.type";

type PropTypes = {
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<any>>;
  setUserData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{ varian: string; message: string }>>;
  session: any;
};

const ModalUpdateUser = (props: PropTypes) => {
  const { updatedUser, setUpdatedUser, setUserData, setToaster, session } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const form: any = event.target as HTMLFormElement;
      const data = {
        role: form.role.value,
      };
      const result = await userServices.updateUser(
        updatedUser.id,
        data,
        session.data?.accessToken
      );

      if (result.status === 200) {
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUsers();
        setUserData(data.data);
        setToaster({
          varian: "success",
          message: "update role success",
        });
      }
    } catch (error: any) {
      const resultFromApi = error.response
        ? error.response.data
        : "failed update role";
      setIsLoading(false);
      setToaster({
        varian: "danger",
        message: resultFromApi,
      });
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update Users</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser.email}
          disabled={true}
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled={true}
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled={true}
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          option={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit" isDisabled={isLoading}>
          {isLoading ? "Loading..." : "Update"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
