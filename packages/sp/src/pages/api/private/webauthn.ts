import {
  RegisterWebauthnRequest,
  WebauthnApi,
} from "@/secure-stream-openapi/typescript/api";
import { Configuration } from "@/secure-stream-openapi/typescript/configuration";
import console from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { apiAxios } from "~/libs/axios";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as RegisterWebauthnRequest;
  const session = await getServerSession(req, res, authOptions);

  const config = new Configuration({
    accessToken: session?.accessToken,
  });

  const webauthnApi = new WebauthnApi(config, undefined, apiAxios);

  const apiResponse = await webauthnApi
    .registerWebauthn(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return null;
    });

  if (apiResponse === null) {
    res.status(500).json(undefined);
    return;
  }

  res.status(200).json(undefined);
}
