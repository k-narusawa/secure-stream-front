import { Button, Toast } from "@/shared-components/src";
import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import ProfileCard from "~/components/pages/account/ProfileCard";
import UserCard from "~/components/pages/account/UserCard";
import { UserInfo, getSdk } from "~/graphql/types";
import { useRouter } from "next/router";
import axios from "axios";

type Props = {
  userInfo: UserInfo;
  idToken: string | undefined;
};

const AccountSettingsPage = (props: Props) => {
  const router = useRouter();

  const onLogout = async () => {
    await axios.post("/api/auth/revoke").catch((err) => {
      console.error(err);
      return;
    });

    signOut({ redirect: false });

    await router.push(
      "http://localhost:44444/oauth2/sessions/logout" +
        `?id_token_hint=${props.idToken}` +
        `&post_logout_redirect_uri=http://localhost:3000/account` +
        "&state=state"
    );
    return;
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
    // NextAuthのセッションを破棄する方法がないのでCookieを削除する
    context.res.setHeader("Set-Cookie", "next-auth.session-token=; path=/;");
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
      idToken: session?.idToken,
    },
  };
};

export default AccountSettingsPage;
