import base64url from "base64url";
import axios from "axios";
import input from "postcss/lib/input";

export const useWebAuthn = () => {
  const apiHost = process.env.NEXT_PUBLIC_SECURE_STREAM_HOST;

  const getCredentials = async (options: any) => {
    console.log(options);
    options.challenge = bufferDecode(options.challenge);
    for (let cred of options.allowCredentials) {
      cred.id = bufferDecode(cred.id);
    }

    return await navigator.credentials
      .get({
        publicKey: options,
      })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postCredentials = async (
    csrf: string,
    flowId: string | null,
    credentials: any,
    loginChallenge: string | null
  ) => {
    console.log(credentials);

    return await axios(`${apiHost}/api/v1/login/webauthn`, {
      method: "POST",
      withCredentials: true,
      data: {
        loginChallenge: loginChallenge,
        flowId: flowId,
        id: credentials.id,
        rawId: base64url.encode(credentials.rawId),
        type: credentials.type,
        response: {
          authenticatorData: base64url.encode(
            credentials.response.authenticatorData
          ),
          clientDataJSON: base64url.encode(credentials.response.clientDataJSON),
          signature: base64url.encode(credentials.response.signature),
          userHandle: credentials.response.userHandle
            ? base64url.encode(credentials.response.userHandle)
            : null,
        },
      },
    })
      .then((response) => {
        return response.data.redirect_to;
      })
      .catch((error) => {
        return undefined;
      });
  };

  return {
    getCredentials,
    postCredentials,
  };
};

function bufferDecode(value: string) {
  return Uint8Array.from(
    atob(value.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0)
  );
}
