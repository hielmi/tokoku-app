import { deleteData, retriveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          const users = await retriveData("users");
          const data = users.map((user: any) => {
            delete user.password;
            return user;
          });
          res
            .status(200)
            .json({ status: true, statusCode: 200, message: "succes", data });
        } else {
          res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Unauthorized",
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const { data } = req.body;
    const token: string = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("users", user[1], data, (result: boolean) => {
            if (result) {
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
          console.log(err);
          res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Unauthorized",
          });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("users", user[1], (result: boolean) => {
            if (result) {
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
          res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Unauthorized",
          });
        }
      }
    );
  }
}
