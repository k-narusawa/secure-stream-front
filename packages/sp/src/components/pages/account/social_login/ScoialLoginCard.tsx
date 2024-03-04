import { SocialLoginUrls } from "@/secure-stream-openapi/typescript/api";
import { Card, HorizontalLine, Modal } from "@/shared-components/src";
import router from "next/router";
import { useState } from "react";
import { SocialLogin } from "~/graphql/types";
import axios from "axios";
import ConnectButton from "~/components/pages/account/social_login/ConnectButton";
import DisconnectButton from "~/components/pages/account/social_login/DisconnectButton";

export interface SocialLoginCardProps {
  urls: SocialLoginUrls;
  socialLogin: SocialLogin;
}

const SocialLoginCard = ({ urls, socialLogin }: SocialLoginCardProps) => {
  const [github, setGitHub] = useState(socialLogin.github);
  const [google, setGoogle] = useState(socialLogin.google);
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
    switch (provider) {
      case "github":
        setGitHub(false);
        break;
      case "google":
        setGoogle(false);
        break;
      default:
        break;
    }
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
          <div className="text-xl font-sans">Social Login</div>
        </div>

        <HorizontalLine />

        <div className="flex justify-between py-4 px-8">
          <span className="text-gray-500 leading-7">GitHub</span>

          {github ? (
            <DisconnectButton provider="github" onDisconnect={onDisconnect} />
          ) : (
            <ConnectButton provider="github" onConnect={onConnect} />
          )}
        </div>
        <HorizontalLine />

        <div className="flex justify-between py-4 px-8">
          <span className="text-gray-500">Google</span>

          {google ? (
            <DisconnectButton provider="google" onDisconnect={onDisconnect} />
          ) : (
            <ConnectButton provider="google" onConnect={onConnect} />
          )}
        </div>
      </Card>
    </>
  );
};

export default SocialLoginCard;
