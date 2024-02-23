import { Card, HorizontalLine, PencilIcon } from "@/shared-components/src";
import Link from "next/link";
import Edit from "~/components/pages/account/Edit";
import { Profile, UserInfo } from "~/graphql/ssr.generated";

export interface UserCardProps {
  userInfo: UserInfo;
}

const UserCard = ({ userInfo }: UserCardProps) => {
  return (
    <Card>
      <div className="py-4 px-8 flex justify-between">
        <div className=" text-xl font-sans">Login</div>
      </div>
      <HorizontalLine />

      <div className="grid grid-cols-6 py-4 px-8">
        <div className="col-start-1">
          <span className="text-gray-500">UserName</span>
        </div>
        <div className="col-start-3">{userInfo.user?.username}</div>
        <div className="col-start-6">
          <Link href="/account/username">
            <Edit />
          </Link>
        </div>
      </div>

      <HorizontalLine />

      <div className="grid grid-cols-6 py-4 px-8">
        <div className="col-start-1">
          <span className="text-gray-500">Password</span>
        </div>
        <div className="col-start-3">*********</div>
        <div className="col-start-6">
          <Link href="/account/password">
            <Edit />
          </Link>
        </div>
      </div>

      <HorizontalLine />

      <div className="grid grid-cols-6 py-4 px-8">
        <div className="col-start-1">
          <span className="text-gray-500">MFA</span>
        </div>
        <div className="col-start-3">None</div>
        <div className="col-start-6">
          <Link href="/account/password">
            <Edit />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
