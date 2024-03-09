type ProfileEditFormInputs = {
  familyName: string;
  givenName: string;
  nickname: string;
};

type UserNameEditFormInputs = {
  username: string;
};

type PasswordEditFormInputs = {
  password: string;
};

type PasskeyDisplay = {
  credentialId: string;
  icon: string | undefined;
  name: string;
};

declare module "@/configs/passkey/aaguid.json" {
  const aaguid: {
    [key: string]: {
      icon_light: string;
      icon_dark: string;
      name: string;
    };
  };
  export default aaguid;
}
