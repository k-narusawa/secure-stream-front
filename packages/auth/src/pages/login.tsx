import LoginCard from "~/components/pages/login/LoginCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toast } from "@/shared-components/src";
import { useWebAuthn } from "~/hooks/useWebauthn";
import { sign } from "crypto";

const LoginPage = () => {
  const [username, setUsername] = useState("test@example.com");
  const [password, setPassword] = useState("!Password0");
  const [csrfToken, setCsrfToken] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const { getCredentials, postCredentials } = useWebAuthn();

  const router = useRouter();
  const searchParams = useSearchParams();
  const loginChallenge = searchParams.get("login_challenge");
  const apiHost = process.env.NEXT_PUBLIC_SECURE_STREAM_HOST;

  useEffect(() => {
    let ignore = false;

    const loginRequest = async () => {
      if (!ignore) {
        await axios(`${apiHost}/api/v1/login`, {
          withCredentials: true,
          params: {
            login_challenge: loginChallenge,
          },
        })
          .then((response) => {
            if (response.data.redirect_to) {
              router.push(response.data.redirect_to);
            }
            setCsrfToken(response.data.csrf_token);
            setGithubUrl(response.data.github_login_url);
          })
          .catch(() => {
            setError("Internal Server Error");
          });
      }
    };

    if (loginChallenge) {
      loginRequest();
    }

    return () => {
      ignore = true;
    };
  }, [apiHost, loginChallenge, router]);

  const onLogin = async (input: LoginFormInputs) => {
    const data = {
      username: input.username,
      password: input.password,
      _csrf: csrfToken,
      login_challenge: loginChallenge,
    };

    const redirectTo = await axios
      .post(`${apiHost}/api/v1/login`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then((response) => {
        return response.data.redirect_to;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError("Authentication has failed.");
        }
        return;
      });

    if (redirectTo) {
      await router.push(redirectTo);
      return;
    }

    await router.push("http://localhost:3000/account");
  };

  const onWebauthnLogin = async () => {
    const options = await axios(`${apiHost}/api/v1/login/webauthn/request`)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        setError("Internal Server Error");
      });

    const credentials = await getCredentials(options);

    const redirectTo = await postCredentials(
      csrfToken,
      options.flowId,
      credentials,
      loginChallenge
    ).catch(() => {
      setError("Internal Server Error");
      return;
    });

    if (redirectTo) {
      await router.push(redirectTo);
      return;
    }
    setError("Internal Server Error");
  };

  return (
    <div className="pt-20">
      <LoginCard
        username={username}
        password={password}
        csrfToken={csrfToken}
        error={error}
        githubUrl={githubUrl}
        setUsername={setUsername}
        setPassword={setPassword}
        onLogin={onLogin}
        onWebauthnLogin={onWebauthnLogin}
      />
    </div>
  );
};

async function getStaticProps() {
  return {
    props: {},
  };
}

export default LoginPage;
