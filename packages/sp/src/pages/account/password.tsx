import axios from "axios";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import PasswordEditCard from "~/components/pages/account/password/PasswordEditCard";

const PasswordPage = () => {
  const router = useRouter();

  const onSubmit = async (data: PasswordEditFormInputs) => {
    await axios.patch("/api/private/password", data).catch((err) => {
      console.error(err);
    });
    await router.push("/account");
  };

  return (
    <div className="pt-10">
      <PasswordEditCard onSubmit={onSubmit} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default PasswordPage;
