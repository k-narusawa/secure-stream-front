import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button, Card, HorizontalLine } from "@/shared-components/src";
import CompleteCard from "~/components/pages/account/social_login/complete/CompleteCard";

const SocialLoginConnectCompletePage = () => {
  const router = useRouter();

  return (
    <div className="pt-10">
      <CompleteCard />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default SocialLoginConnectCompletePage;
