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

export type User = {
  __typename?: 'User';
  isAccountLock?: Maybe<Scalars['Boolean']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  profile?: Maybe<Profile>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoQuery = { __typename?: 'Query', userInfo?: { __typename?: 'UserInfo', userId?: string | null, user?: { __typename?: 'User', username?: string | null, isAccountLock?: boolean | null } | null, profile?: { __typename?: 'Profile', familyName?: string | null, givenName?: string | null, nickname?: string | null, picture?: string | null } | null } | null };

export type ProfileMutationVariables = Exact<{
  familyName: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  nickname?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProfileMutation = { __typename?: 'Mutation', changeProfile?: { __typename?: 'Profile', familyName?: string | null, givenName?: string | null, nickname?: string | null } | null };


export const UserInfoDocument = gql`
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
    UserInfo(variables?: UserInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserInfoQuery>(UserInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserInfo', 'query', variables);
    },
    Profile(variables: ProfileMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProfileMutation>(ProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Profile', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;