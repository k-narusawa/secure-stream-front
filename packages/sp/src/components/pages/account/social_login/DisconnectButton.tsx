import { Button, LinkIcon } from "@/shared-components/src";

type DisConnectButtonProps = {
  provider: string;
  onDisconnect: (provider: string) => void;
};

const DisconnectButton = ({
  provider,
  onDisconnect,
}: DisConnectButtonProps) => {
  return (
    <div className="flex items-center w-24">
      <Button
        onClick={() => {
          onDisconnect(provider);
        }}
        disabled={false}
        size="small"
        variant="danger"
      >
        <span className="">disconnect</span>
      </Button>
    </div>
  );
};

export default DisconnectButton;
