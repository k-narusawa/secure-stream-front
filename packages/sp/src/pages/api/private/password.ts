import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { apiAxios } from "~/libs/axios";
import { Configuration } from "@/secure-stream-openapi/typescript/configuration";
import { PasswordApi } from "@/secure-stream-openapi/typescript/api";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const session = await getServerSession(req, res, authOptions);
    const data = req.body;

    const config = new Configuration({
      accessToken: session?.accessToken,
    });

    const passwordApi = new PasswordApi(config, undefined, apiAxios);

    const apiResponse = await passwordApi
      .changePassword(data.password, undefined)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });

    if (apiResponse === null) {
      res.status(500);
      return;
    }

    res.status(204).json(undefined);
  }
  return res.status(500);
}
