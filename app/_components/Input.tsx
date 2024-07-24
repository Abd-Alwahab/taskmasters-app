import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"input">;

function Input({ ...props }: Props) {
  return (
    <input
      className="w-full rounded-lg border border-gray-300 px-2.5 py-3"
      {...props}
    />
  );
}

export default Input;
