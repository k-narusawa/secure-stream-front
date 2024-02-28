import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import {
  RequestWebauthnRegistration,
  WebauthnApi,
} from "@/secure-stream-openapi/typescript/api";
import { apiAxios } from "~/libs/axios";
import { Configuration } from "@/secure-stream-openapi/typescript/configuration";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<RequestWebauthnRegistration>
) {
  const session = await getServerSession(req, res, authOptions);

  const config = new Configuration({
    accessToken: session?.accessToken,
  });

  const webauthnApi = new WebauthnApi(config, undefined, apiAxios);

  const apiResponse = await webauthnApi
    .requestWebauthnRegistration()
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return null;
    });

  if (apiResponse === null) {
    res.status(500);
    return;
  }

  res.status(200).json(apiResponse);
}
