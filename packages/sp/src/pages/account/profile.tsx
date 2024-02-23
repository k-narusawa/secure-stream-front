import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import ProfileEditCard from "~/components/pages/account/profile/ProfileEditCard";
import { UserInfo, getSdk } from "~/graphql/ssr.generated";
import { useState } from "react";
import { Toast } from "@/shared-components/src";

type Props = {
  userInfo: UserInfo;
};

const ProfilePage = ({ userInfo }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  const onSubmit = async (data: ProfileEditFormInputs) => {
    axios
      .post("/api/private/profile", data)
      .then(() => {
        router.push("/account");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update profile");
      });
  };

  return (
    <div className="pt-10">
      <ProfileEditCard
        familyName={userInfo.profile?.familyName || ""}
        givenName={userInfo.profile?.givenName || ""}
        nickname={userInfo.profile?.nickname || ""}
        onSubmit={onSubmit}
      />
      {error && (
        <div className="z-50 fixed bottom-0 w-full flex justify-center">
          <Toast
            type="danger"
            message={error}
            onClose={() => {
              setError(undefined);
            }}
          />
        </div>
      )}
    </div>
  );
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

export default ProfilePage;
