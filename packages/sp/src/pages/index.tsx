import { Button, Card } from "@/shared-components/src";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const onLogout = async () => {
    signOut();
  };

  if (session) {
    return (
      <>
        <div>user_id: {session.id}</div>
        <div>access_token: {session.accessToken}</div>
        <div>refresh_token: {session.refreshToken}</div>
        <div>id_token: {session.idToken}</div>
        <div>expires_at: {session.expiresAt}</div>
        <Button onClick={onLogout} disabled={false}>
          ログアウト
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="pt-10">
        <Card>
          <div className="text-xl font-medium text-gray-900 text-center">
            Login
          </div>
          <div className="flex flex-col mt-5">
            <Button onClick={() => signIn("hydra")} disabled={false}>
              ログイン
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
