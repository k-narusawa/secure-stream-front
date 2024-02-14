import { useSession } from "next-auth/react";
import UserInfoCard from "~/components/account/settings/UserInfoCard";

const AccountSettingsPage = () => {
  const { data: session } = useSession();

  if (session) {
    <></>;
  }

  return (
    <div className="pt-10">
      <UserInfoCard user={session?.id} />
    </div>
  );
};

export default AccountSettingsPage;
