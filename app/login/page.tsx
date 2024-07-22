import Image from "next/image";

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-12 pt-20">
      <h1 className="text-3xl">Login to access the Planner</h1>

      <button className="group flex gap-3 rounded-full border border-quill-gray-900 px-12 py-3 transition-all hover:bg-quill-gray-950">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span className="text-lg font-medium transition-all group-hover:text-white">
          Login with Google
        </span>
      </button>
    </div>
  );
};

export default Login;
