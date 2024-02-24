import axios from "axios";
import console from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const session = await getServerSession(req, res, authOptions);

  const apiResponse = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/webauthn`, data, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (apiResponse === null) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  res.status(200).json(apiResponse);
}
