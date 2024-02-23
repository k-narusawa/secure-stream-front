import { Sdk, getSdk } from "./../../../graphql/ssr.generated";
import console from "console";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { GraphQLClient } from "graphql-request";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const session = await getServerSession(req, res, authOptions);

  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  );
  client.setHeader("Authorization", `Bearer ${session?.accessToken}`);

  const sdk = getSdk(client);
  await sdk
    .Profile({
      familyName: data.familyName,
      givenName: data.givenName,
      nickname: data.nickname,
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    });

  res.status(200).json({ name: "John Doe" });
}
