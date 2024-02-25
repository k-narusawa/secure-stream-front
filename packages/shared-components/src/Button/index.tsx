export const Button = ({
  children,
  variant = "primary",
  disabled,
  ...props
}: {
  children: React.ReactNode;
  variant?: string;
  disabled: boolean;
  [key: string]: any;
}) => {
  const baseStyle = "w-full py-2 px-4 font-normal rounded-lg shadow-md";
  let variantStyle = "";
  if (disabled) {
    variantStyle = "text-gray bg-gray-light cursor-not-allowed";
  } else if (variant === "primary") {
    variantStyle = "text-white bg-blue hover:bg-blue-dark";
  } else if (variant === "secondary") {
    variantStyle = "text-gray-dark bg-gray-light hover:bg-gray";
  } else if (variant === "danger") {
    variantStyle = "text-white-dark bg-red hover:bg-red-dark";
  }

  return (
    <button className={`${baseStyle} ${variantStyle}`} {...props}>
      {children}
    </button>
  );
};
