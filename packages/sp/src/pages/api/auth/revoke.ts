import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";
import axios from "axios";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    const params = new URLSearchParams();
    params.append("client_id", process.env.HYDRA_CLIENT_ID ?? "");
    params.append("client_secret", process.env.HYDRA_CLIENT_SECRET ?? "");
    params.append("token", session?.accessToken ?? "");

    await axios
      .post(`${process.env.HYDRA_URL}/oauth2/revoke`, params)
      .then(() => {
        res.status(204).json(undefined);
        return;
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        return;
      });
  }

  res.status(405);
  return;
}
