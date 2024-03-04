import { Card, HorizontalLine, Button } from "@/shared-components/src";
import router from "next/router";

const CompleteCard = () => {
  return (
    <Card>
      <div className="py-4 px-8 flex justify-between">
        <div className="text-xl font-sans">Social Login</div>
      </div>

      <HorizontalLine />

      <div className="py-4 px-8">
        <span className="text-gray-500">Complete Connect</span>
      </div>
      <div className="py-4 px-8">
        <Button
          type="primary"
          onClick={async () => {
            await router.push("/account/social_login");
          }}
          disabled={false}
        >
          Back to Social Login
        </Button>
      </div>
    </Card>
  );
};

export default CompleteCard;
