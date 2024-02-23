import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import UserInfoCard from "~/components/account/settings/UserInfoCard";
import { UserInfo, getSdk } from "~/graphql/ssr.generated";

type Props = {
  userInfo?: UserInfo;
};

const AccountSettingsPage = (props: Props) => {
  if (props.userInfo) {
    <></>;
  }

  if (props.userInfo) {
    return (
      <div className="pt-10">
        <UserInfoCard userinfo={props.userInfo} />
      </div>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  );
  client.setHeader("Authorization", `Bearer ${session?.accessToken}`);

  const sdk = getSdk(client);
  const userInfo = await sdk.UserInfo().then((res) => {
    return res.userInfo;
  });

  return {
    props: {
      userInfo: userInfo,
    },
  };
};

export default AccountSettingsPage;
