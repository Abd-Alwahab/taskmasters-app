"use client";

import { LuLogOut } from "react-icons/lu";
import { logoutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <button onClick={() => logoutAction()}>
      <LuLogOut className="text-3xl lg:text-xl" />
    </button>
  );
}

export default SignOutButton;
