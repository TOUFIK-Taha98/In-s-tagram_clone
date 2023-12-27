import { Button, ButtonProps } from "./ui/button";

type ActionIconProps = Partial<ButtonProps> & {
  children: React.ReactNode;
};

const ActionIcon = ({ children, ...buttonProps }: ActionIconProps) => {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="w-9 h-9"
      {...buttonProps}
    >
      {children}
    </Button>
  );
};
export default ActionIcon;
