import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    signIn("hydra");
  });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session && session.expiresAt > Date.now() / 1000) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
