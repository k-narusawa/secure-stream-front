type UserInfo = {
  userId: string;
  user: User;
  profile: Profile;
};

type User = {
  username: string;
  isAccountLock: boolean;
};

type Profile = {
  familyName: string;
  givenName: string;
  nickname: string;
  picture: string;
};
