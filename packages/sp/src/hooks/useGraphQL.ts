import { GraphQLClient } from "graphql-request";

export const useGraphQL = () => {
  const apiHost = process.env.NEXT_PUBLIC_API_URL;
  const client = new GraphQLClient(`${apiHost}/graphql`);

  const queryRequest = async (token: string, query: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);
    return await client.request(query);
  };

  return { queryRequest };
};
