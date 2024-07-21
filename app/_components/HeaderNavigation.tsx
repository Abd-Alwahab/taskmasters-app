import Link from "next/link";

const HeaderNavigation = () => {
  return (
    <div className="flex items-center gap-8 py-6">
      <nav>
        <ul className="flex gap-8">
          <li>
            <Link className="text-sm" href="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="text-sm" href="/tasks">
              Tasks
            </Link>
          </li>

          <li>
            <Link className="text-sm" href="/about">
              About
            </Link>
          </li>

          <li>
            <Link className="text-sm" href="/developer">
              Developer
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <button className="group rounded-full border border-quill-gray-950 px-4 py-2 transition-all hover:bg-quill-gray-950">
          <span className="text-sm text-quill-gray-950 transition-all group-hover:text-white">
            Login / Signup
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeaderNavigation;
