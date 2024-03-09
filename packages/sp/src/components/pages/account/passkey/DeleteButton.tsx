import { Button } from "@/shared-components/src";

type DeleteButtonProps = {
  credentialId: string;
  onDelete: (credentialId: string) => void;
};

const DeleteButton = ({ credentialId, onDelete }: DeleteButtonProps) => {
  return (
    <div className="flex items-center w-18">
      <Button
        onClick={() => {
          onDelete(credentialId);
        }}
        disabled={false}
        size="small"
        variant="danger"
      >
        <span className="">delete</span>
      </Button>
    </div>
  );
};

export default DeleteButton;
