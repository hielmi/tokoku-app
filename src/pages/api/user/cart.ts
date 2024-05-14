import { retriveDataById, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded) {
            const user: any = await retriveDataById("users", decoded.id);
            user.id = decoded.id;
            res.status(200).json({
              statusCode: 200,
              status: true,
              message: "success",
              data: user.carts || [],
            });
          } else {
            res.status(404).json({
              statusCode: 404,
              status: true,
              message: "Not Found",
              data: {},
            });
          }
        }
      );
    } else {
      res.status(403).json({
        statusCode: 403,
        status: true,
        message: "Access Denied",
        data: {},
      });
    }
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const token: string = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success updated cart",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed updated cart",
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
  } else {
    res.status(405).json({
      status: false,
      message: "Method not allowed",
    });
  }
}
