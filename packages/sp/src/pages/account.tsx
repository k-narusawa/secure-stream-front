import { Button, Toast } from "@/shared-components/src";
import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import ProfileCard from "~/components/pages/account/ProfileCard";
import UserCard from "~/components/pages/account/UserCard";
import { UserInfo, getSdk } from "~/graphql/types";
import { useState } from "react";
import { useWebAuthn } from "~/hooks/useWebauthn";

type Props = {
  userInfo: UserInfo;
};

const AccountSettingsPage = (props: Props) => {
  const {
    requestRegistration,
    createCredentials,
    registerCredentials,
    deleteWebauthn,
  } = useWebAuthn();
  const [completeMsg, setCompleteMsg] = useState<string | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [webauthn, setWebauthn] = useState(
    props.userInfo.user?.passkey ?? false
  );

  const onLogout = async () => {
    signOut();
  };

  const onWebAuthnRequest = async () => {
    const res = await requestRegistration();
    if (!res) {
      setErrorMsg("Failed to request registration");
      return;
    }
    const credentials = await createCredentials(res);
    await registerCredentials(res.flowId, credentials)
      .then(() => {
        setWebauthn(true);
        setCompleteMsg("Registration Complete");
      })
      .catch((err) => {
        setErrorMsg("Failed to register credentials");
      });
  };

  const onWebAuthnDelete = async () => {
    await deleteWebauthn();
    setWebauthn(false);
  };

  if (props.userInfo?.profile) {
    return (
      <div className="pt-10">
        <UserCard
          onWebAuthnRequest={onWebAuthnRequest}
          onWebAuthnDelete={onWebAuthnDelete}
          userInfo={props.userInfo}
          webauthn={webauthn}
        />
        <div className="my-10" />
        <ProfileCard profile={props.userInfo.profile} />
        <div className="mt-10 flex justify-center items-center">
          <div className="w-48">
            <Button variant="danger" onClick={onLogout} disabled={false}>
              Logout
            </Button>
          </div>
        </div>
        {errorMsg && (
          <div className="z-50 fixed bottom-0 w-full flex justify-center">
            <Toast
              type="danger"
              message={errorMsg}
              onClose={() => {
                setErrorMsg(undefined);
              }}
            />
          </div>
        )}
        {completeMsg && (
          <div className="z-50 fixed bottom-0 w-full flex justify-center">
            <Toast
              type="success"
              message={completeMsg}
              onClose={() => {
                setCompleteMsg(undefined);
              }}
            />
          </div>
        )}
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
    },
  };
};

export default AccountSettingsPage;
