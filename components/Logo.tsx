import { SwitchCamera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Logo = () => {
  return (
    <Link
      href={"/dashboard"}
      //   buttonVariant, style an element that is not a button with buttons style.
      className={buttonVariants({
        className:
          "hidden md:flex navLink !mb-10 lg:hover:bg-transparent lg:!p-0",
        variant: "ghost",
        size: "lg",
      })}
    >
      <SwitchCamera className="h-6 w-6 shrink-0 lg:hidden" />
      <p className={`font-semibold text-xl hidden lg:block`}>PixelGram</p>
    </Link>
  );
};
export default Logo;
