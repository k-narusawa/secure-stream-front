import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import UserInfoCard from "~/components/account/settings/UserInfoCard";
import { UserInfo, getSdk } from "~/graphql/ssr.generated";

type Props = {
  userInfo?: UserInfo;
};

const AccountSettingsPage = (props: Props) => {
  const router = useRouter();
  const onLogout = async () => {
    signOut();
  };

  if (!props.userInfo) {
    router.push("/");
  }

  if (props.userInfo) {
    return (
      <div className="pt-10">
        <UserInfoCard userinfo={props.userInfo} onLogout={onLogout} />
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
  const userInfo = await sdk
    .UserInfo()
    .then((res) => {
      return res.userInfo;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  return {
    props: {
      userInfo: userInfo,
    },
  };
};

export default AccountSettingsPage;
