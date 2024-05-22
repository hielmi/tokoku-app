import instance from "@/lib/axios/instance";

const productServices = {
  getAllProducts: () => instance.get("/api/product"),
  getProduct: (id: string) => instance.get(`/api/product/${id}`),
  addProduct: (data: any) => instance.post("/api/product", data),
  updateProduct: (id: string, data: any) =>
    instance.put(`/api/product/${id}`, { data }),
  deleteProduct: (id: string) => instance.delete(`/api/product/${id}`),
};

export default productServices;
