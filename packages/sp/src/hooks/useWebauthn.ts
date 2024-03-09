import base64url from "base64url";
import axios, { AxiosResponse } from "axios";
import {
  RequestWebauthnRegistration,
  WebauthnRegistration,
} from "@/secure-stream-openapi/typescript/api";

export const useWebAuthn = () => {
  const requestRegistration = async () => {
    return await axios(`/api/private/webauthn/request`)
      .then((res: AxiosResponse<RequestWebauthnRegistration>) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  };

  const createCredentials = async (options: any) => {
    options.user.id = bufferDecode(options.user.id);
    options.challenge = bufferDecode(options.challenge);

    return await navigator.credentials
      .create({
        publicKey: options,
      })
      .then((response) => {
        if (!response) {
          throw new Error("No response from navigator.credentials.create");
        }
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Failed to create credentials");
      });
  };

  const registerCredentials = async (
    flowId: string,
    credentials: any
  ): Promise<WebauthnRegistration> => {
    return await axios
      .post(`/api/private/webauthn`, {
        withCredentials: true,
        data: {
          flowId: flowId,
          id: credentials.id,
          rawId: base64url.encode(credentials.rawId),
          type: credentials.type,
          response: {
            attestationObject: base64url.encode(
              credentials.response.attestationObject
            ),
            clientDataJSON: base64url.encode(
              credentials.response.clientDataJSON
            ),
          },
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const deleteWebauthn = async () => {
    await axios
      .delete(`/api/private/webauthn`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return {
    requestRegistration,
    createCredentials,
    registerCredentials,
    deleteWebauthn,
  };
};

function bufferDecode(value: string) {
  return Uint8Array.from(
    atob(value.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0)
  );
}
