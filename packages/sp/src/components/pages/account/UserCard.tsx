import { Card, EditIconLink, HorizontalLine } from "@/shared-components/src";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserInfo } from "~/graphql/types";

export interface UserCardProps {
  userInfo: UserInfo;
}

const UserCard = ({ userInfo }: UserCardProps) => {
  const router = useRouter();

  return (
    <>
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
              <EditIconLink />
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
              <EditIconLink />
            </Link>
          </div>
        </div>

        <HorizontalLine />

        <div className="grid grid-cols-6 py-4 px-8">
          <div className="col-start-1">
            <span className="text-gray-500">MFA</span>
          </div>
          {userInfo.user?.mfa ? (
            <div className="col-start-3 text-green">Enabled</div>
          ) : (
            <div className="col-start-3 text-red">Disabled</div>
          )}
          <div className="col-start-6">
            <Link href="/account/password">
              <EditIconLink />
            </Link>
          </div>
        </div>

        <HorizontalLine />

        <div className="grid grid-cols-6 py-4 px-8">
          <div className="col-start-1">
            <span className="text-gray-500">PassKey</span>
          </div>

          <div className="col-start-3"></div>
          <div className="col-start-6">
            <button
              onClick={async () => {
                await router.push("/account/passkey");
              }}
            >
              <EditIconLink />
            </button>
          </div>
        </div>

        <HorizontalLine />

        <div className="grid grid-cols-6 py-4 px-8">
          <div className="col-start-1">
            <span className="text-gray-500">Social</span>
          </div>
          <div className="col-start-3"></div>
          <div className="col-start-6">
            <Link href="/account/social_login">
              <EditIconLink />
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
};

export default UserCard;
