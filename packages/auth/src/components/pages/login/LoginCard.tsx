import { Button, Input, Card } from "@/shared-components/src";
import ErrorAlert from "~/components/pages/login/ErrorAlert";
import { useForm } from "react-hook-form";

type LoginCardProps = {
  username: string;
  password: string;
  csrfToken: string;
  error: string | undefined;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  onLogin: (data: LoginFormInputs) => void;
};

const LoginCard = ({ ...props }: LoginCardProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: async () => {
      return {
        username: props.username,
        password: props.password,
      };
    },
    mode: "onBlur",
  });

  return (
    <Card>
      <div
        className="text-xl font-sans font-medium
      text-gray-900 text-center
        py-4 px-8"
      >
        Login
      </div>
      {props.error && (
        <div className="mt-10 font-sans">
          <ErrorAlert error={props.error} />
        </div>
      )}
      <form onSubmit={handleSubmit(props.onLogin)}>
        <div className="flex flex-col mt-5 px-8">
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="test@example.com"
            control={control}
            rules={{
              required: "Username is required",
            }}
          />
        </div>
        <div className="flex flex-col mt-5 px-8">
          <Input
            label="Password"
            type="password"
            name="password"
            control={control}
            rules={{
              required: "Password is required",
            }}
          />
        </div>
        <input type="hidden" value={props.csrfToken} />
        <div className="pt-10 pb-5 px-10 text-center font-sans">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginCard;
