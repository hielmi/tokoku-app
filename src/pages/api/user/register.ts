import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (result: { status: boolean; message: string }) => {
      if (result.status) {
        res.status(200).json({
          statusCode: 200,
          status: result.status,
          message: result.message,
        });
      } else {
        res.status(400).json({
          statusCode: 400,
          status: result.status,
          message: result.message,
        });
      }
    });
  } else {
    res.status(405).json({
      status: false,
      message: "Method not allowed",
    });
  }
}
