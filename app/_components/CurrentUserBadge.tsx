import { auth } from "../_lib/auth";

async function CurrentUserBadge() {
  const session = await auth();

  return (
    <div className="flex items-center justify-center gap-2 transition-colors">
      <img
        src={session.user.image ?? ""}
        alt="user image"
        className="size-8 rounded-full"
        referrerPolicy="no-referrer"
        width={32}
        height={32}
      />
      <span className="text-lg">{session?.user?.name}</span>
    </div>
  );
}

export default CurrentUserBadge;
