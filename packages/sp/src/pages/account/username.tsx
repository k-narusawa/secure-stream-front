import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserNameEditCard from "~/components/pages/account/username/UserNameEditCard";
import { User, UserInfo, getSdk } from "~/graphql/ssr.generated";

type Props = {
  user: User;
};

const PasswordPage = ({ user }: Props) => {
  const router = useRouter();

  const onSubmit = async (data: UserNameEditFormInputs) => {
    console.log(data);
    await router.push("/account");
  };

  const username = user?.username || "";

  return (
    <div className="pt-10">
      <UserNameEditCard username={username} onSubmit={onSubmit} />
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
  const user = await sdk
    .UserOnly()
    .then((res) => {
      return res.userInfo?.user;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
};

export default PasswordPage;
