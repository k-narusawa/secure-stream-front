import {
  RegisterWebauthnRequest,
  WebauthnApi,
} from "@/secure-stream-openapi/typescript/api";
import { Configuration } from "@/secure-stream-openapi/typescript/configuration";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { apiAxios } from "~/libs/axios";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const config = new Configuration({
    accessToken: session?.accessToken,
  });
  const webauthnApi = new WebauthnApi(config, undefined, apiAxios);

  if (req.method === "POST") {
    const data = req.body.data as RegisterWebauthnRequest;

    const apiResponse = await webauthnApi
      .registerWebauthn(data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return null;
      });

    if (apiResponse === null) {
      res.status(500).json(undefined);
      return;
    }

    return res.status(200).json(apiResponse);
  } else if (req.method === "DELETE") {
    const apiResponse = await webauthnApi
      .deleteAllWebauthn()
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

  res.status(405).json(undefined);
}
