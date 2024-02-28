import { PencilIcon } from "@/shared-components/src";

export const EditIconLink = () => {
  return (
    <div className="text-md font-sans flex items-center hover:cursor-pointer hover:underline">
      <div className="w-4 h-4 mx-1">
        <PencilIcon />
      </div>
      <span className="">edit</span>
    </div>
  );
};

export const DeleteIconLink = () => {
  return (
    <div className="text-md font-sans flex items-center hover:cursor-pointer hover:underline hover:decoration-red">
      <div className="w-4 h-4 mx-1">
        <PencilIcon />
      </div>
      <span className="text-red">delete</span>
    </div>
  );
};
