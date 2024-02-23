import { Button, Card } from "@/shared-components/src";
import { UserInfo } from "~/graphql/ssr.generated";

export interface UserInfoCardProps {
  userinfo: UserInfo;
  onLogout: () => void;
}

const UserInfoCard = ({ userinfo, onLogout }: UserInfoCardProps) => {
  return (
    <Card>
      <p>{userinfo.user?.username}</p>
      <Button onClick={onLogout} disabled={false}>
        ログアウト
      </Button>
    </Card>
  );
};

export default UserInfoCard;
