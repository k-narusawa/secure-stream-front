import {
  Button,
  Input,
  Card,
  HorizontalLine,
  GitHubIcon,
  GoogleIcon,
} from "@/shared-components/src";
import ErrorAlert from "~/components/pages/login/ErrorAlert";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

type LoginCardProps = {
  username: string;
  password: string;
  csrfToken: string;
  error: string | undefined;
  githubUrl: string;
  googleUrl: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  onLogin: (data: LoginFormInputs) => void;
  onWebauthnLogin: () => void;
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
  const router = useRouter();

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
        <div className="mt-10 font-sans px-8">
          <ErrorAlert error={props.error} />
        </div>
      )}
      <form onSubmit={handleSubmit(props.onLogin)}>
        <div className="flex flex-col mt-5 px-8">
          <div className="py-2">
            <span className="text-gray-500">Username</span>
          </div>
          <Input
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
          <div className="">
            <span className="text-gray-500">Password</span>
          </div>
          <Input
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

      <div className="text-center pb-5">
        <button onClick={props.onWebauthnLogin}>
          <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Use Passkey
          </a>
        </button>
      </div>

      <HorizontalLine />

      <div className="px-10 py-5 text-center font-sans">
        <div className="">
          <Button
            onClick={async () => {
              await router.push(props.googleUrl);
            }}
            variant="alternative"
            disabled={false}
          >
            <div className="flex justify-center">
              <div className="h-6 w-6">
                <GoogleIcon />
              </div>
              <span className="ml-1">Google Login</span>
            </div>
          </Button>
        </div>

        <div className=" pt-5">
          <Button
            onClick={async () => {
              await router.push(props.githubUrl);
            }}
            variant="alternative"
            disabled={false}
          >
            <div className="flex justify-center">
              <div className="h-6 w-6">
                <GitHubIcon />
              </div>
              <span className="ml-1">GitHub Login</span>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LoginCard;
