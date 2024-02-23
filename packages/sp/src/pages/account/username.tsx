import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserNameEditCard from "~/components/pages/account/username/UserNameEditCard";
import { UserInfo, getSdk } from "~/graphql/ssr.generated";

type Props = {
  userInfo: UserInfo;
};

const PasswordPage = ({ userInfo }: Props) => {
  const router = useRouter();

  const onSubmit = async (data: UserNameEditFormInputs) => {
    console.log(data);
    await router.push("/account");
  };

  const username = userInfo.user?.username || "";

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

export default PasswordPage;
