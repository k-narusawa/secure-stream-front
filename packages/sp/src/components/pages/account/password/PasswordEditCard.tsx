import { Button, Card, Input } from "@/shared-components/src";
import { useForm } from "react-hook-form";

type PasswordEditCardProps = {
  onSubmit: (data: PasswordEditFormInputs) => void;
};

export const PasswordEditCard = ({ onSubmit }: PasswordEditCardProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<PasswordEditFormInputs>({
    defaultValues: async () => {
      return {
        password: "",
      };
    },
    mode: "onBlur",
  });

  return (
    <Card>
      <div className="py-4 px-8 flex justify-between">
        <div className=" text-xl font-sans">Password</div>
        <div className=""></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 px-8">
          <div className="text-gray-500 whitespace-nowrap py-2">Password</div>
          <Input
            className="col-start-1"
            type="password"
            name="password"
            placeholder="*********"
            control={control}
          />
        </div>

        <div className="py-4 px-8">
          <div className="text-gray-500 whitespace-nowrap py-2">
            Confirm Password
          </div>
          <Input
            className="col-start-1"
            type="password"
            name="password"
            placeholder="*********"
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

export default PasswordEditCard;
