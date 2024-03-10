import { Button, Card, HorizontalLine } from "@/shared-components/src";
import { useRouter } from "next/router";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const onBack = async () => {
    await router.back();
  };

  const onTop = async () => {
    await router.push("/account");
  };

  return (
    <div className="py-20">
      <Card>
        <div className="py-4 px-8 flex justify-center">
          <div className="text-xl font-sans">Page Not Found...</div>
        </div>

        <div className="py-10 px-8 flex justify-between">
          <div className="w-32">
            <Button variant="alternative" onClick={onBack} disabled={false}>
              Back
            </Button>
          </div>
          <div className="w-32">
            <Button variant="primary" onClick={onTop} disabled={false}>
              Top
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
