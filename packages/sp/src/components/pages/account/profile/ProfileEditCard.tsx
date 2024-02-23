import { Button, Card, Input } from "@/shared-components/src";
import { useForm } from "react-hook-form";

type ProfileEditCardProps = {
  familyName: string;
  givenName: string;
  nickname: string | null;
  onSubmit: (data: ProfileEditFormInputs) => void;
};

export const ProfileEditCard = ({
  familyName,
  givenName,
  nickname,
  onSubmit,
}: ProfileEditCardProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<ProfileEditFormInputs>({
    defaultValues: async () => {
      return {
        familyName: familyName,
        givenName: givenName,
        nickname: nickname || "",
      };
    },
    mode: "onBlur",
  });

  return (
    <Card>
      <div className="py-4 px-8 flex justify-between">
        <div className=" text-xl font-sans">Profile</div>
        <div className=""></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4 px-8">
          <div className="text-gray-500 whitespace-nowrap">Full Name</div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Input
              className="col-start-1"
              type="text"
              name="familyName"
              placeholder="Family Name"
              control={control}
              rules={{
                required: "Family Name is required",
              }}
            />
            <Input
              className="col-start-2"
              type="text"
              name="givenName"
              placeholder="Given Name"
              control={control}
              rules={{
                required: "Given Name is required",
              }}
            />
          </div>
          <div className="text-gray-500 whitespace-nowrap py-2">Nickname</div>

          <Input
            className="col-start-1"
            type="text"
            name="nickname"
            placeholder="Nickname"
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

export default ProfileEditCard;
