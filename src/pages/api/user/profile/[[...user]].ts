import { retriveDataById, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";

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
            const profile: any = await retriveDataById("users", decoded.id);
            profile.id = decoded.id;
            res.status(200).json({
              statusCode: 200,
              status: true,
              message: "success",
              data: profile,
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
      return res.status(403).json({
        statusCode: 403,
        status: true,
        message: "Access Denied",
        data: {},
      });
    }
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const { data } = req.body;
    const token: string = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          // logic to update password
          if (data.password) {
            const passwordMatch = await compare(
              data.oldPassword,
              data.encryptedPassword
            );

            if (!passwordMatch) {
              return res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Password not match",
              });
            }
            delete data.oldPassword;
            delete data.encryptedPassword;
            data.password = await hash(data.password, 10);
          }

          await updateData("users", user[0], data, (result: boolean) => {
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
  } else {
    res.status(405).json({
      status: false,
      message: "Method not allowed",
    });
  }
}
