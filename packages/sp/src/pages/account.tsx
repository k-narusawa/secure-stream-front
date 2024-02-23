import { Button } from "@/shared-components/src";
import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import ProfileCard from "~/components/pages/account/ProfileCard";
import UserCard from "~/components/pages/account/UserCard";
import { UserInfo, getSdk } from "~/graphql/ssr.generated";

type Props = {
  userInfo: UserInfo;
};

const AccountSettingsPage = (props: Props) => {
  const onLogout = async () => {
    signOut();
  };

  if (props.userInfo?.profile) {
    return (
      <div className="pt-10">
        <UserCard userInfo={props.userInfo} />
        <div className="my-10" />
        <ProfileCard profile={props.userInfo.profile} />
        <div className="mt-10 flex justify-center items-center">
          <div className="w-48">
            <Button variant="danger" onClick={onLogout} disabled={false}>
              Logout
            </Button>
          </div>
        </div>
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

  if (!userInfo) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userInfo: userInfo,
    },
  };
};

export default AccountSettingsPage;
