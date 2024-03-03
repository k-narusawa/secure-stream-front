import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button } from "@/shared-components/src";

const SocialLoginConnectCompletePage = () => {
  const router = useRouter();

  return (
    <div className="pt-10">
      <Button
        type="primary"
        onClick={async () => {
          await router.push("/account");
        }}
        disabled={false}
      >
        Complete Connect with GitHub
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default SocialLoginConnectCompletePage;
