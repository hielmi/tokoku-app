import instance from "@/lib/axios/instance";
import { updateProfile } from "firebase/auth";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUser: (id: string, data: any) =>
    instance.put(`/api/user/${id}`, { data }),

  deleteUser: (id: string) => instance.delete(`/api/user/${id}`),

  getProfile: () => instance.get("/api/user/profile"),

  updateProfile: (data: any) => instance.put(`/api/user/profile`, { data }),

  getCarts: () => instance.get("/api/user/cart"),

  addToCart: (data: any) => instance.put(`/api/user/cart`, { data }),

  getFavProduct: () => instance.get("/api/user/fav"),

  addFav: (data: any) => instance.put(`/api/user/fav`, { data }),
};

export default userServices;
