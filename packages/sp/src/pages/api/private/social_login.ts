import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import {
  SocialLoginApi,
  SocialLoginUrls,
} from "@/secure-stream-openapi/typescript/api";
import { apiAxios } from "~/libs/axios";
import { Configuration } from "@/secure-stream-openapi/typescript/configuration";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    const { provider } = req.query;

    const config = new Configuration({
      accessToken: session?.accessToken,
    });

    const socialLoginApi = new SocialLoginApi(config, undefined, apiAxios);

    const apiResponse = await socialLoginApi
      .deleteSocialLogin(provider as string, undefined)
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
