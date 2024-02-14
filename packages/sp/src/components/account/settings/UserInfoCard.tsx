import { Button, Card } from "@/shared-components/src";

export interface UserInfoCardProps {
  user: string | undefined;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  return (
    <Card>
      <p>{user}</p>
      <Button onClick={() => {}} disabled={false}>
        ログアウト
      </Button>
    </Card>
  );
};

export default UserInfoCard;
