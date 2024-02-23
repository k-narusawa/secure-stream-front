import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    signIn("hydra");
  });
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (process.env.NODE_ENV !== "development") {
    return {
      redirect: {
        destination: "/account/settings",
        permanent: false,
      },
    };
  }

  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/account/settings",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
