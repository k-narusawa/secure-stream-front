import {
  Card,
  DeleteIconLink,
  EditIconLink,
  HorizontalLine,
  Modal,
} from "@/shared-components/src";
import Link from "next/link";
import { useState } from "react";
import { UserInfo } from "~/graphql/types";

export interface UserCardProps {
  userInfo: UserInfo;
  webauthn: boolean;
  onWebAuthnRequest: () => void;
  onWebAuthnDelete: () => void;
}

const UserCard = ({
  userInfo,
  webauthn,
  onWebAuthnRequest,
  onWebAuthnDelete,
}: UserCardProps) => {
  const [onModal, setOnModal] = useState(false);

  const openModal = () => {
    setOnModal(true);
  };

  const closeModal = () => {
    setOnModal(false);
  };

  return (
    <>
      {onModal && (
        <div className="text-center">
          <Modal
            onConfirmed={onWebAuthnDelete}
            onClosed={closeModal}
            description="Are you delete Passkey?"
          ></Modal>
        </div>
      )}
      <Card>
        <div className="py-4 px-8 flex justify-between">
          <div className=" text-xl font-sans">Login</div>
        </div>
        <HorizontalLine />

        <div className="grid grid-cols-6 py-4 px-8">
          <div className="col-start-1">
            <span className="text-gray-500">UserName</span>
          </div>
          <div className="col-start-3">{userInfo.user?.username}</div>
          <div className="col-start-6">
            <Link href="/account/username">
              <EditIconLink />
            </Link>
          </div>
        </div>

        <HorizontalLine />

        <div className="grid grid-cols-6 py-4 px-8">
          <div className="col-start-1">
            <span className="text-gray-500">Password</span>
          </div>
          <div className="col-start-3">*********</div>
          <div className="col-start-6">
            <Link href="/account/password">
              <EditIconLink />
            </Link>
          </div>
        </div>

        <HorizontalLine />

        <div className="grid grid-cols-6 py-4 px-8">
          <div className="col-start-1">
            <span className="text-gray-500">MFA</span>
          </div>
          {userInfo.user?.mfa ? (
            <div className="col-start-3 text-green">Enabled</div>
          ) : (
            <div className="col-start-3 text-red">Disabled</div>
          )}
          <div className="col-start-6">
            <Link href="/account/password">
              <EditIconLink />
            </Link>
          </div>
        </div>

        <HorizontalLine />

        <div className="grid grid-cols-6 py-4 px-8">
          <div className="col-start-1">
            <span className="text-gray-500">PassKey</span>
          </div>
          {webauthn ? (
            <>
              <div className="col-start-3 text-green">Enabled</div>
              <div className="col-start-6">
                <button onClick={openModal}>
                  <DeleteIconLink />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="col-start-3 text-red">Disabled</div>
              <div className="col-start-6">
                <button
                  onClick={() => {
                    onWebAuthnRequest();
                  }}
                >
                  <EditIconLink />
                </button>
              </div>
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export default UserCard;
