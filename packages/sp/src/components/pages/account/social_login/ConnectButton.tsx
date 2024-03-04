import { Button, LinkIcon } from "@/shared-components/src";

type ConnectButtonProps = {
  provider: string;
  onConnect: (provider: string) => void;
};

const ConnectButton = ({ provider, onConnect }: ConnectButtonProps) => {
  return (
    <div className="flex items-center w-24">
      <Button
        onClick={() => {
          onConnect(provider);
        }}
        disabled={false}
        size="small"
      >
        <span className="">connect</span>
      </Button>
    </div>
  );
};

export default ConnectButton;
