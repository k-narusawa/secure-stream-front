import axios from "axios";
import { getSdk } from "../../../../graphql/ssr.generated";
import console from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const apiResponse = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/webauthn/request`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!apiResponse) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  res.status(200).json(apiResponse);
}
