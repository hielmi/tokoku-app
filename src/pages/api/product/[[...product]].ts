import {
  addData,
  deleteData,
  retriveData,
  updateData,
  deleteFile,
  retriveDataById,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { product }: any = req.query;
    if (product && product[0]) {
      const data = await retriveDataById("products", product[0]);
      res
        .status(200)
        .json({ status: true, statusCode: 200, message: "succes", data });
    } else {
      const data = await retriveData("products");
      res
        .status(200)
        .json({ status: true, statusCode: 200, message: "succes", data });
    }
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          let data = req.body;
          data.created_at = new Date();
          data.updated_at = new Date();
          data.price = parseInt(data.price);
          data.stock?.filter((stock: any) => {
            stock.qty = parseInt(stock.qty);
          });

          await addData("products", data, (status: boolean, result: any) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: { id: result.id },
              });
            } else {
              res.status(400).json({
                stasus: false,
                statusCode: 400,
                message: "failed",
                data: {},
              });
            }
          });
        } else {
          res.status(403).json({
            stasus: false,
            statusCode: 403,
            message: "Access Denied",
            data: {},
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { product }: any = req.query;
    const { data } = req.body;

    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("products", product[0], data, (status: boolean) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed",
              });
            }
          });
        } else {
          res.status(403).json({
            stasus: false,
            statusCode: 403,
            message: "Access Denied fdgs",
            data: {},
          });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { product }: any = req.query;
    const token: string = req.headers.authorization?.split(" ")[1] || "";

    try {
      const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
      if (decoded && decoded.role === "admin") {
        const data: any = await retriveDataById("products", product[0]);
        const nameFile =
          data.image === "" ? null : data.image.split("%2F")[3].split("?")[0];
        await deleteFile(
          `/images/products/${product[0]}/${nameFile}`,
          async (status: boolean) => {
            if (status) {
              await deleteData(
                "products",
                product[0],
                async (status: boolean) => {
                  if (status) {
                    res.status(200).json({
                      status: true,
                      statusCode: 200,
                      message: "success",
                    });
                  } else {
                    res.status(400).json({
                      status: false,
                      statusCode: 400,
                      message: "failed",
                    });
                  }
                }
              );
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed",
              });
            }
          }
        );
      } else {
        res
          .status(401)
          .json({ status: false, statusCode: 401, message: "Unauthorized" });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  }
}
