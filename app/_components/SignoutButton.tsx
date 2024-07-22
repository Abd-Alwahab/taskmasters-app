"use client";

import { LuLogOut } from "react-icons/lu";
import { logoutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <button onClick={() => logoutAction()}>
      <LuLogOut />
    </button>
  );
}

export default SignOutButton;
