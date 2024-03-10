import LoginCard from "~/components/pages/login/LoginCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useWebAuthn } from "~/hooks/useWebauthn";
import DefaultErrorPage from "next/error";

const LoginPage = () => {
  const [username, setUsername] = useState("test@example.com");
  const [password, setPassword] = useState("!Password0");
  const [csrfToken, setCsrfToken] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

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
            setGoogleUrl(response.data.google_login_url);
          })
          .catch((_err) => {
            setError(true);
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
          setErrorMsg("Authentication has failed.");
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
        setErrorMsg("Internal Server Error");
      });

    const credentials = await getCredentials(options);

    const redirectTo = await postCredentials(
      csrfToken,
      options.flowId,
      credentials,
      loginChallenge
    ).catch(() => {
      setErrorMsg("Internal Server Error");
      return;
    });

    if (redirectTo) {
      await router.push(redirectTo);
      return;
    }
    setErrorMsg("Internal Server Error");
  };

  if (error) {
    return <DefaultErrorPage statusCode={500} />;
  }

  if (!error && csrfToken && githubUrl && googleUrl) {
    return (
      <div className="pt-20">
        <LoginCard
          username={username}
          password={password}
          csrfToken={csrfToken}
          error={errorMsg}
          githubUrl={githubUrl}
          googleUrl={googleUrl}
          setUsername={setUsername}
          setPassword={setPassword}
          onLogin={onLogin}
          onWebauthnLogin={onWebauthnLogin}
        />
      </div>
    );
  }

  return <> </>;
};

async function getStaticProps() {
  return {
    props: {},
  };
}

export default LoginPage;
