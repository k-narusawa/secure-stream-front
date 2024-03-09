import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { WebauthnApi } from "@/secure-stream-openapi/typescript/api";
import { apiAxios } from "~/libs/axios";
import { Configuration } from "@/secure-stream-openapi/typescript/configuration";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { credentialId } = req.query;
  const session = await getServerSession(req, res, authOptions);

  const config = new Configuration({
    accessToken: session?.accessToken,
  });

  if (req.method === "DELETE" && credentialId) {
    if (typeof credentialId !== "string") {
      res.status(400);
      return;
    }

    const webauthnApi = new WebauthnApi(config, undefined, apiAxios);
    const apiResponse = await webauthnApi
      .deleteWebauthn(credentialId)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return null;
      });

    if (apiResponse === null) {
      console.log("Failed to delete webauthn");
      return res.status(500).json(undefined);
    }

    return res.status(204).json(undefined);
  }

  return res.status(405);
}
