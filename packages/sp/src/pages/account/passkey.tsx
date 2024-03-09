import { Toast } from "@/shared-components/src";
import { GraphQLClient } from "graphql-request";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PasskeyCard from "~/components/pages/account/passkey/PasskeyCard";
import { Passkey, getSdk } from "~/graphql/types";
import { useWebAuthn } from "~/hooks/useWebauthn";
import axios from "axios";
import master from "@/configs/passkey/aaguid.json";

type Props = {
  passkey: Array<Passkey>;
};

const PasskeyPage = ({ passkey }: Props) => {
  const [completeMsg, setCompleteMsg] = useState<string | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const { requestRegistration, createCredentials, registerCredentials } =
    useWebAuthn();
  const [passkeyList, setPasskeyList] = useState<Array<PasskeyDisplay>>([]);

  useEffect(() => {
    const list = passkey.map((p) => {
      if (!p.aaguid || !master[p.aaguid] || !p.credentialId) {
        return;
      }
      return {
        credentialId: p.credentialId as string,
        icon: master[p.aaguid].icon_light as string,
        name: master[p.aaguid].name as string,
      };
    }) as Array<PasskeyDisplay>;
    setPasskeyList(list);
  }, [passkey]);

  const onRegister = async () => {
    const res = await requestRegistration();
    if (!res) {
      setErrorMsg("Failed to request registration");
      return;
    }
    const credentials = await createCredentials(res);
    const response = await registerCredentials(res.flowId, credentials)
      .then((res) => {
        setCompleteMsg("Registration Complete");
        return res;
      })
      .catch((err) => {
        return null;
      });

    if (response === null) {
      setErrorMsg("Failed to register credentials");
      return;
    }

    const newList = passkeyList.concat({
      credentialId: response.credential_id as string,
      icon: master[response.aaguid].icon_light as string,
      name: master[response.aaguid].name as string,
    });
    setPasskeyList(newList);
  };

  const onDelete = async (credentialId: string) => {
    await axios
      .delete(`/api/private/webauthn/${credentialId}`)
      .then(() => {
        setCompleteMsg("Delete Complete");
      })
      .catch((err) => {
        setErrorMsg("Failed to register credentials");
      });
    const newList = passkeyList.filter((p) => p.credentialId !== credentialId);
    setPasskeyList(newList);
  };

  return (
    <div className="pt-10">
      <PasskeyCard
        passkeyList={passkeyList}
        onRegister={onRegister}
        onDelete={onDelete}
      />
      {errorMsg && (
        <div className="z-50 fixed bottom-0 w-full flex justify-center">
          <Toast
            type="danger"
            message={errorMsg}
            onClose={() => {
              setErrorMsg(undefined);
            }}
          />
        </div>
      )}
      {completeMsg && (
        <div className="z-50 fixed bottom-0 w-full flex justify-center">
          <Toast
            type="success"
            message={completeMsg}
            onClose={() => {
              setCompleteMsg(undefined);
            }}
          />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  );
  client.setHeader("Authorization", `Bearer ${session?.accessToken}`);

  const sdk = getSdk(client);
  const passkey = await sdk
    .PasskeyOnly()
    .then((res) => {
      return res.userInfo?.passkey;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!passkey) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      passkey: passkey,
    },
  };
};

export default PasskeyPage;
