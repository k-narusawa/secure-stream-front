import axios from "axios";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import { useEffect } from "react";

const LogoutPage = () => {
  const searchParams = useSearchParams();
  const logoutChallenge = searchParams.get("logout_challenge");
  const apiHost = process.env.NEXT_PUBLIC_SECURE_STREAM_HOST;

  useEffect(() => {
    let ignore = false;

    const logoutRequest = async () => {
      if (!ignore) {
        await axios(`${apiHost}/api/v1/logout`, {
          withCredentials: true,
          params: {
            logout_challenge: logoutChallenge,
          },
        })
          .then((response) => {
            if (response.data.redirect_to) {
              router.push(response.data.redirect_to);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    if (logoutChallenge) {
      logoutRequest();
    }

    return () => {
      ignore = true;
    };
  }, [apiHost, logoutChallenge]);

  return <></>;
};

export default LogoutPage;
