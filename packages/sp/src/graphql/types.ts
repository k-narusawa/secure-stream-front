import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  changeProfile?: Maybe<Profile>;
};


export type MutationChangeProfileArgs = {
  familyName: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  nickname?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type Passkey = {
  __typename?: 'Passkey';
  aaguid?: Maybe<Scalars['String']['output']>;
  credentialId?: Maybe<Scalars['String']['output']>;
};

export type Profile = {
  __typename?: 'Profile';
  familyName?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  userInfo?: Maybe<UserInfo>;
};

export type SocialLogin = {
  __typename?: 'SocialLogin';
  github?: Maybe<Scalars['Boolean']['output']>;
  google?: Maybe<Scalars['Boolean']['output']>;
};

export type User = {
  __typename?: 'User';
  isAccountLock?: Maybe<Scalars['Boolean']['output']>;
  mfa?: Maybe<Scalars['Boolean']['output']>;
  passkey?: Maybe<Scalars['Boolean']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  passkey?: Maybe<Array<Maybe<Passkey>>>;
  profile?: Maybe<Profile>;
  socialLogin?: Maybe<SocialLogin>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserProfileFragment = { __typename?: 'Profile', familyName?: string | null, givenName?: string | null, nickname?: string | null, picture?: string | null };

export type UserInformationFragment = { __typename?: 'User', username?: string | null, isAccountLock?: boolean | null, mfa?: boolean | null, passkey?: boolean | null };

export type UserSocialLoginFragment = { __typename?: 'SocialLogin', google?: boolean | null, github?: boolean | null };

export type UserPasskeyFragment = { __typename?: 'Passkey', credentialId?: string | null, aaguid?: string | null };

export type UserOnlyQueryVariables = Exact<{ [key: string]: never; }>;


export type UserOnlyQuery = { __typename?: 'Query', userInfo?: { __typename?: 'UserInfo', user?: { __typename?: 'User', username?: string | null, isAccountLock?: boolean | null, mfa?: boolean | null, passkey?: boolean | null } | null } | null };

export type ProfileOnlyQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileOnlyQuery = { __typename?: 'Query', userInfo?: { __typename?: 'UserInfo', profile?: { __typename?: 'Profile', familyName?: string | null, givenName?: string | null, nickname?: string | null, picture?: string | null } | null } | null };

export type SocialLoginOnlyQueryVariables = Exact<{ [key: string]: never; }>;


export type SocialLoginOnlyQuery = { __typename?: 'Query', userInfo?: { __typename?: 'UserInfo', socialLogin?: { __typename?: 'SocialLogin', google?: boolean | null, github?: boolean | null } | null } | null };

export type PasskeyOnlyQueryVariables = Exact<{ [key: string]: never; }>;


export type PasskeyOnlyQuery = { __typename?: 'Query', userInfo?: { __typename?: 'UserInfo', passkey?: Array<{ __typename?: 'Passkey', credentialId?: string | null, aaguid?: string | null } | null> | null } | null };

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'Query', userInfo?: { __typename?: 'UserInfo', user?: { __typename?: 'User', username?: string | null, isAccountLock?: boolean | null, mfa?: boolean | null, passkey?: boolean | null } | null, profile?: { __typename?: 'Profile', familyName?: string | null, givenName?: string | null, nickname?: string | null, picture?: string | null } | null } | null };

export type ProfileMutationVariables = Exact<{
  familyName: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  nickname?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProfileMutation = { __typename?: 'Mutation', changeProfile?: { __typename?: 'Profile', familyName?: string | null, givenName?: string | null, nickname?: string | null } | null };

export const UserProfileFragmentDoc = gql`
    fragment UserProfile on Profile {
  familyName
  givenName
  nickname
  picture
}
    `;
export const UserInformationFragmentDoc = gql`
    fragment UserInformation on User {
  username
  isAccountLock
  mfa
  passkey
}
    `;
export const UserSocialLoginFragmentDoc = gql`
    fragment UserSocialLogin on SocialLogin {
  google
  github
}
    `;
export const UserPasskeyFragmentDoc = gql`
    fragment UserPasskey on Passkey {
  credentialId
  aaguid
}
    `;
export const UserOnlyDocument = gql`
    query UserOnly {
  userInfo {
    user {
      ...UserInformation
    }
  }
}
    ${UserInformationFragmentDoc}`;
export const ProfileOnlyDocument = gql`
    query ProfileOnly {
  userInfo {
    profile {
      ...UserProfile
    }
  }
}
    ${UserProfileFragmentDoc}`;
export const SocialLoginOnlyDocument = gql`
    query SocialLoginOnly {
  userInfo {
    socialLogin {
      ...UserSocialLogin
    }
  }
}
    ${UserSocialLoginFragmentDoc}`;
export const PasskeyOnlyDocument = gql`
    query PasskeyOnly {
  userInfo {
    passkey {
      ...UserPasskey
    }
  }
}
    ${UserPasskeyFragmentDoc}`;
export const UserInfoDocument = gql`
    query UserInfo {
  userInfo {
    user {
      ...UserInformation
    }
    profile {
      ...UserProfile
    }
  }
}
    ${UserInformationFragmentDoc}
${UserProfileFragmentDoc}`;
export const ProfileDocument = gql`
    mutation Profile($familyName: String!, $givenName: String!, $nickname: String) {
  changeProfile(
    familyName: $familyName
    givenName: $givenName
    nickname: $nickname
  ) {
    familyName
    givenName
    nickname
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UserOnly(variables?: UserOnlyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserOnlyQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserOnlyQuery>(UserOnlyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserOnly', 'query', variables);
    },
    ProfileOnly(variables?: ProfileOnlyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProfileOnlyQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProfileOnlyQuery>(ProfileOnlyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProfileOnly', 'query', variables);
    },
    SocialLoginOnly(variables?: SocialLoginOnlyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SocialLoginOnlyQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SocialLoginOnlyQuery>(SocialLoginOnlyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SocialLoginOnly', 'query', variables);
    },
    PasskeyOnly(variables?: PasskeyOnlyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PasskeyOnlyQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PasskeyOnlyQuery>(PasskeyOnlyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PasskeyOnly', 'query', variables);
    },
    UserInfo(variables?: UserInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserInfoQuery>(UserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserInfo', 'query', variables);
    },
    Profile(variables: ProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProfileMutation>(ProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Profile', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;