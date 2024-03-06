import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import axios from "axios";
import { signOut } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    const params = new URLSearchParams();
    params.append("client_id", process.env.HYDRA_CLIENT_ID ?? "");
    params.append("client_secret", process.env.HYDRA_CLIENT_SECRET ?? "");
    params.append("token", session?.accessToken ?? "");

    await axios
      .post(`${process.env.HYDRA_URL}/oauth2/revoke`, params)
      .catch((err) => {
        console.error(err);
        res.redirect("/error");
        return;
      });

    signOut();
    res.redirect("/");
    return;
  }

  res.redirect("/error");
  return;
}
