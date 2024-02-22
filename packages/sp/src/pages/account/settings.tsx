import { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserInfoCard from "~/components/account/settings/UserInfoCard";
import { useGraphQL } from "~/hooks/useGraphQL";

const AccountSettingsPage = () => {
  const { data: session } = useSession();
  const { queryRequest } = useGraphQL();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const query = `
          query UserInfo {
            userInfo {
                userId
                user {
                    username
                    isAccountLock
                }
                profile {
                    familyName
                    givenName
                    nickname
                    picture
                }
            }
          }    
      `;
      queryRequest(session?.accessToken as string, query)
        .then((res: any) => {
          const userInfo = res.userInfo as UserInfo;
          setUserInfo(userInfo);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  if (session) {
    <></>;
  }

  if (userInfo) {
    return (
      <div className="pt-10">
        <UserInfoCard userinfo={userInfo} />
      </div>
    );
  }
};

export async function getStaticProps() {
  return {
    props: {
      title: "Account Settings",
    },
  };
}

export default AccountSettingsPage;
