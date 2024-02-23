import { Button, Card } from "@/shared-components/src";
import { UserInfo } from "~/graphql/ssr.generated";

export interface UserInfoCardProps {
  userinfo: UserInfo;
}

const UserInfoCard = ({ userinfo }: UserInfoCardProps) => {
  return (
    <Card>
      <p>{userinfo.user?.username}</p>
      <Button onClick={() => {}} disabled={false}>
        ログアウト
      </Button>
    </Card>
  );
};

export default UserInfoCard;
