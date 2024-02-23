import { PencilIcon } from "@/shared-components/src";

const Edit = () => {
  return (
    <div className="text-md font-sans flex items-center hover:cursor-pointer">
      <div className="w-4 h-4 mx-1">
        <PencilIcon />
      </div>
      edit
    </div>
  );
};

export default Edit;
