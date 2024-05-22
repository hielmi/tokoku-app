import styles from "./Profile.module.scss";
import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import userServices from "@/services/user";
import { User } from "@/type/user.type";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

interface UploadResult {
  status: "success";
  message: string;
  url: string;
}

const ProfileMemberViews = ({ setToaster }: PropTypes) => {
  const [changeImage, setChangeImage] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState("");
  const [profile, setProfile] = useState<User | any>({});

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    try {
      await userServices.updateProfile(data);
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
      setToaster({
        variant: "success",
        message: "update profile success",
      });
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "update profile failed",
      });
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile_" + file.name.split(".")[1];

    if (file) {
      setIsLoading("picture");
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, result: UploadResult) => {
          if (status) {
            const data = {
              image: result.url,
            };
            try {
              await userServices.updateProfile(data);
              setIsLoading("");
              setProfile({
                ...profile,
                image: result.url,
              });
              setChangeImage(undefined);
              form.reset();
              setToaster({
                variant: result.status,
                message: result.message,
              });
            } catch (error: any) {
              const resultFromApi = error.response
                ? error.response.data
                : "failed to change Picture";
              setIsLoading("");
              setChangeImage(undefined);
              form.reset();
              setToaster({
                variant: "error",
                message: resultFromApi,
              });
            }
          } else {
            setToaster({
              variant: result.status,
              message: result.message,
            });
            setChangeImage(undefined);
            setIsLoading("");
            form.reset();
          }
        }
      );
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;

    const data = {
      password: form.newPassword.value,
      oldPassword: form.oldPassword.value,
      encryptedPassword: profile.password,
    };
    try {
      await userServices.updateProfile(data);
      setIsLoading("");
      form.reset();
      setToaster({
        variant: "success",
        message: "success update password",
      });
    } catch (error: any) {
      const resultFromApi = error.response
        ? error.response.data
        : "failed to change Password";
      setIsLoading("");
      form.reset();
      setToaster({
        variant: "danger",
        message: resultFromApi?.message,
      });
    }
  };

  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__row}>
          <div className={styles.profile__main__row__avatar}>
            <h2 className={styles.profile__main__row__avatar__title}>Avatar</h2>
            {profile.image ? (
              <Image
                className={styles.profile__main__row__avatar__image}
                src={profile.image}
                alt="avatar"
                width={200}
                height={200}
              />
            ) : (
              <div className={styles.profile__main__row__avatar__image}>
                {profile?.fullname?.charAt(0)}
              </div>
            )}
            <form onSubmit={handleChangeProfilePicture}>
              <label
                htmlFor="upload-image"
                className={styles.profile__main__row__avatar__label}
              >
                {changeImage !== undefined ? (
                  <p className={styles.profile__main__row__avatar__label__text}>
                    {changeImage.name}
                  </p>
                ) : (
                  <>
                    <p>
                      Upload a newe avatar, Larger image will be resize
                      automatically
                    </p>
                    <p>
                      Maximum upload size is <b>1 MB</b>
                    </p>
                  </>
                )}
              </label>
              <input
                className={styles.profile__main__row__avatar__input}
                type="file"
                name="image"
                id="upload-image"
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeImage(e.currentTarget.files[0]);
                }}
              />
              <Button
                className={styles.profile__main__row__avatar__button}
                type="submit"
                isDisabled={isLoading ? true : false}
              >
                {isLoading === "picture" ? "Loading..." : "Update Picture"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__profile}>
            <h2 className={styles.profile__main__row__profile__title}>
              Profile
            </h2>
            <form onSubmit={handleChangeProfile}>
              <Input
                name="fullname"
                label="Fullname"
                defaultValue={profile.fullname}
                type="text"
              />
              <Input
                name="phone"
                label="Phone"
                defaultValue={profile.phone}
                type="number"
              />
              <Input
                name="email"
                label="Email"
                defaultValue={profile.email}
                type="email"
                disabled={true}
              />
              <Input
                name="role"
                label="Role"
                defaultValue={profile.role}
                type="email"
                disabled={true}
              />
              <Button type="submit" isDisabled={isLoading ? true : false}>
                {isLoading === "profile" ? "Loading..." : "Update Profile"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__password}>
            <h2 className={styles.profile__main__row__password__title}>
              Change Password
            </h2>
            <form onSubmit={handleChangePassword}>
              <Input name="oldPassword" label="Old Password" type="password" />
              <Input name="newPassword" label="New Password" type="password" />
              <Button
                type="submit"
                isDisabled={
                  Object.hasOwn(profile, "type") || isLoading ? true : false
                }
              >
                {isLoading === "password" ? "Loading..." : "Change Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberViews;
