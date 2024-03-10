import { Button, Toast } from "@/shared-components/src";
import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import ProfileCard from "~/components/pages/account/ProfileCard";
import UserCard from "~/components/pages/account/UserCard";
import { UserInfo, getSdk } from "~/graphql/types";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "next/error";

type Props = {
  userInfo: UserInfo | undefined;
  idToken: string | null;
  error: boolean;
};

const AccountSettingsPage = ({ userInfo, idToken, error }: Props) => {
  const router = useRouter();

  const onLogout = async () => {
    await axios.post("/api/auth/revoke").catch((err) => {
      console.error(err);
      return;
    });

    signOut({ redirect: false });

    await router.push(
      "http://localhost:44444/oauth2/sessions/logout" +
        `?id_token_hint=${idToken}` +
        `&post_logout_redirect_uri=http://localhost:3000` +
        "&state=state"
    );
    return;
  };

  if (error) {
    console.error("Error: AccountSettingsPage");
    return <Error statusCode={500} />;
  }

  if (userInfo?.profile) {
    return (
      <div className="pt-10">
        <UserCard userInfo={userInfo} />
        <div className="my-10" />
        <ProfileCard profile={userInfo.profile} />
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

  return <Error statusCode={500} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  );
  client.setHeader("Authorization", `Bearer ${session?.accessToken}`);

  const sdk = getSdk(client);
  const response = await sdk
    .UserInfo()
    .then((res) => {
      return res.userInfo;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        return err.response;
      }

      return null;
    });

  if (axios.isAxiosError(response)) {
    // NextAuthのセッションを破棄する方法がないのでCookieを削除する
    if (response && response.status === 401) {
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
        userInfo: undefined,
        idToken: session?.idToken || null,
        error: true,
      },
    };
  }

  return {
    props: {
      userInfo: response,
      idToken: session?.idToken || null,
      error: false,
    },
  };
};

export default AccountSettingsPage;
