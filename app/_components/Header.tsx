import { createClient } from "../_utils/supabase/server";
import CurrentUserBadge from "./CurrentUserBadge";
import HeaderNavigation from "./HeaderNavigation";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";

const Header = async () => {
  const { data: session } = await createClient().auth.getUser();

  return (
    <div className="flex justify-between py-4">
      <Logo />
      <div className="z-10 hidden flex-1 transition-all lg:block">
        <HeaderNavigation />
      </div>

      <div className="relative z-20 block lg:hidden">
        <MobileNavigation session={session}>
          <CurrentUserBadge />
        </MobileNavigation>
      </div>
    </div>
  );
};

export default Header;
