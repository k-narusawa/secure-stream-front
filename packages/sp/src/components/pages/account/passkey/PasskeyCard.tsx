import { Card, HorizontalLine, Modal, PlusIcon } from "@/shared-components/src";
import Image from "next/image";
import { useState } from "react";
import DeleteButton from "~/components/pages/account/passkey/DeleteButton";

type PasskeyCardProps = {
  passkeyList: Array<PasskeyDisplay>;
  onRegister: () => void;
  onDelete: (credentialId: string) => void;
};

const PasskeyCard = ({
  passkeyList: passkeyList,
  onRegister,
  onDelete,
}: PasskeyCardProps) => {
  const [onModal, setOnModal] = useState(false);
  const [deleteCredentialId, setDeleteCredentialId] = useState("");

  const deletePasskeySet = (credentialId: string) => {
    setDeleteCredentialId(credentialId);
    openModal();
  };

  const deletePasskey = async () => {
    await onDelete(deleteCredentialId);
    closeModal();
  };

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
            onConfirmed={deletePasskey}
            onClosed={closeModal}
            description="Are you delete Passkey?"
          ></Modal>
        </div>
      )}
      <Card>
        <div className="py-4 px-8 flex justify-between">
          <div className=" text-xl font-sans">Passkey</div>
        </div>
        <HorizontalLine />

        {passkeyList.map((p, i) => {
          return (
            <>
              <div className="flex justify-between py-4 px-8" key={i}>
                <div className="flex items-center">
                  <div className="h-6 w-6">
                    {p.icon && (
                      <Image
                        src={p.icon}
                        alt="passkey icon"
                        width={36}
                        height={36}
                      />
                    )}
                  </div>
                  <span className=" ml-1 text-gray-500 leading-7">
                    {p.name}
                  </span>
                </div>
                <DeleteButton
                  credentialId={p.credentialId}
                  onDelete={deletePasskeySet}
                />
              </div>
              <HorizontalLine />
            </>
          );
        })}
        <div className="flex justify-center py-4 px-8">
          <button onClick={onRegister}>
            <div className="flex items-center hover:font-semibold">
              <div className="w-4 h-4 mx-1">
                <PlusIcon />
              </div>
              <span className=" text-gray-500 leading-7">Add Passkey</span>
            </div>
          </button>
        </div>
      </Card>
    </>
  );
};

export default PasskeyCard;
