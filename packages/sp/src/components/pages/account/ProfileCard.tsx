import { Card, HorizontalLine } from "@/shared-components/src";
import Link from "next/link";
import Edit from "~/components/pages/account/Edit";
import { Profile } from "~/graphql/types";

export interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <Card>
      <div className="py-4 px-8 flex justify-between">
        <div className=" text-xl font-sans">Profile</div>
        <div className=""></div>
        <Link href="/account/profile">
          <Edit />
        </Link>
      </div>

      <HorizontalLine />

      <div className="grid grid-cols-6 py-4 px-8">
        <div className="col-start-1">
          <span className="text-gray-500 whitespace-nowrap">Full Name</span>
        </div>
        <div className="col-start-3 whitespace-nowrap">
          {profile.familyName} {profile.givenName}
        </div>
      </div>

      <HorizontalLine />

      <div className="grid grid-cols-6 py-4 px-8">
        <div className="col-start-1">
          <span className="text-gray-500">Nickname</span>
        </div>
        <div className="col-start-3 whitespace-nowrap">{profile.nickname}</div>
      </div>
    </Card>
  );
};

export default ProfileCard;
