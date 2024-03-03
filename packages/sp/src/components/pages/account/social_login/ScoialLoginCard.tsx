import { SocialLoginUrls } from "@/secure-stream-openapi/typescript/api";
import {
  Card,
  ConnectIconLink,
  DisconnectIconLink,
  EditIconLink,
  HorizontalLine,
  Modal,
} from "@/shared-components/src";
import router from "next/router";
import { useState } from "react";
import { SocialLogin } from "~/graphql/types";
import axios from "axios";

export interface SocialLoginCardProps {
  urls: SocialLoginUrls;
  socialLogin: SocialLogin;
}

const SocialLoginCard = ({ urls, socialLogin }: SocialLoginCardProps) => {
  const [onModal, setOnModal] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = () => {
    setOnModal(true);
  };

  const closeModal = () => {
    setOnModal(false);
  };

  const onConnect = async (provider: string) => {
    const url = (() => {
      switch (provider) {
        case "github":
          return urls.github;
        case "google":
          return urls.google;
        default:
          return null;
      }
    })();

    if (url) {
      await router.push(url);
    }
  };

  const onDisconnect = async (provider: string) => {
    await axios
      .delete(`/api/private/social_login?provider=${provider}`)
      .catch((err) => {
        console.error(err);
        setError("Failed to disconnect");
      });
  };

  return (
    <>
      {onModal && (
        <div className="text-center">
          <Modal
            onConfirmed={() => {
              console.log("onConfirmed");
            }}
            onClosed={closeModal}
            description="Are you delete Passkey?"
          ></Modal>
        </div>
      )}
      <Card>
        <div className="py-4 px-8 flex justify-between">
          <div className=" text-xl font-sans">Social Login</div>
        </div>

        <HorizontalLine />

        <div className="flex justify-between py-4 px-8">
          <span className="text-gray-500">GitHub</span>

          {socialLogin.github ? (
            <button
              onClick={() => {
                onDisconnect("github");
              }}
            >
              <DisconnectIconLink />
            </button>
          ) : (
            <button
              onClick={() => {
                onConnect("github");
              }}
            >
              <ConnectIconLink />
            </button>
          )}
        </div>
        <HorizontalLine />

        <div className="flex justify-between py-4 px-8">
          <span className="text-gray-500">Google</span>

          {socialLogin.google ? (
            <button
              onClick={() => {
                onDisconnect("google");
              }}
            >
              <DisconnectIconLink />
            </button>
          ) : (
            <button
              onClick={() => {
                onConnect("google");
              }}
            >
              <ConnectIconLink />
            </button>
          )}
        </div>
      </Card>
    </>
  );
};

export default SocialLoginCard;
