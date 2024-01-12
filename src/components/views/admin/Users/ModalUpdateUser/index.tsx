import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { FormEvent, useState } from "react";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

const ModalUpdateUser = (props: any) => {
  const { modalUpdateUser, setModalUpdateUser, setUserData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const session: any = useSession();

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };
    const result = await userServices.updateUser(
      modalUpdateUser.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setModalUpdateUser({});
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setModalUpdateUser({})}>
      <h1>Update Users</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={modalUpdateUser.email}
          disabled={true}
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={modalUpdateUser.fullname}
          disabled={true}
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={modalUpdateUser.phone}
          disabled={true}
        />
        <Select
          label="Role"
          name="role"
          defaultValue={modalUpdateUser.role}
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
