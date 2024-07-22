import { auth } from "../_lib/auth";
import HeaderNavigation from "./HeaderNavigation";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";

const Header = async () => {
  const session = await auth();
  return (
    <div className="flex justify-between py-4">
      <Logo />
      <div className="z-10 hidden flex-1 transition-all lg:block">
        <HeaderNavigation />
      </div>

      <div className="relative z-20 block lg:hidden">
        <MobileNavigation session={session} />
      </div>
    </div>
  );
};

export default Header;
