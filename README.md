# secure-stream-front

[secure-stream](https://github.com/k-narusawa/secure-stream)のフロント部分をまとめた monorepo 構成のプロジェクト

## 構成

- auth
  - 認証画面を担うプロジェクト(IdP におけるログイン画面と同意画面)
- sp
  - IdP における sp を担うプロジェクト
- shared-components
  - monorepo 内で共通で使うコンポーネントを管理するプロジェクト

## 起動方法

```sh
npm run dev
```

> [!TIP]
> `concurrently`が導入されているため複数のプロジェクトが同時に実行される設定になっています

## 設定

`hydra`に登録するクライアント

```json
{
  "client_name": "hydra",
  "grant_types": ["authorization_code", "refresh_token", "client_credentials"],
  "response_types": ["code"],
  "redirect_uris": [
    "http://127.0.0.1:3000/api/auth/callback/hydra",
    "http://localhost:3000/api/auth/callback/hydra"
  ],
  "frontchannel_logout_uri": "http://localhost:3000/api/auth/logout",
  "post_logout_redirect_uris": ["http://localhost:3000/api/auth/logout"],
  "scope": "openid offline email",
  "token_endpoint_auth_method": "client_secret_post"
}
```
