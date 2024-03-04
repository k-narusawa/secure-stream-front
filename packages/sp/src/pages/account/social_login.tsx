import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { SocialLoginUrls } from "@/secure-stream-openapi/typescript/api";
import { getSession } from "next-auth/react";
import SocialLoginCard from "~/components/pages/account/social_login/ScoialLoginCard";
import { GraphQLClient } from "graphql-request";
import { SocialLogin, getSdk } from "~/graphql/types";

type Props = {
  urls: SocialLoginUrls;
  socialLogin: SocialLogin;
};

const SocialLoginPage = ({ urls, socialLogin }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();

  return (
    <div className="pt-10">
      <SocialLoginCard urls={urls} socialLogin={socialLogin} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  const urls = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/social_login/urls`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  );
  client.setHeader("Authorization", `Bearer ${session?.accessToken}`);

  const sdk = getSdk(client);
  const socialLogin = await sdk
    .SocialLoginOnly()
    .then((res) => {
      return res.userInfo?.socialLogin;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!urls || !socialLogin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      urls: urls,
      socialLogin: socialLogin,
    },
  };
};

export default SocialLoginPage;
