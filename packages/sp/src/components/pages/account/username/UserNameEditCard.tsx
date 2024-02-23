import { Button, Card, Input } from "@/shared-components/src";
import { useForm } from "react-hook-form";

type UserNameEditCardProps = {
  username: string;
  onSubmit: (data: UserNameEditFormInputs) => void;
};

export const UserNameEditCard = ({
  username,
  onSubmit,
}: UserNameEditCardProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<UserNameEditFormInputs>({
    defaultValues: async () => {
      return {
        username: "",
      };
    },
    mode: "onBlur",
  });

  return (
    <Card>
      <div className="py-4 px-8 flex justify-between">
        <div className=" text-xl font-sans">UserName</div>
        <div className=""></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 px-8">
          <div className="text-gray-500 whitespace-nowrap py-2">UserName</div>
          <div>{username}</div>
        </div>

        <div className="py-4 px-8">
          <div className="text-gray-500 whitespace-nowrap py-2">
            New UserName
          </div>
          <Input
            className="col-start-1"
            type="text"
            name="username"
            placeholder={username}
            control={control}
          />
        </div>

        <div className="pt-5 pb-5 px-20 text-center font-sans">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default UserNameEditCard;
