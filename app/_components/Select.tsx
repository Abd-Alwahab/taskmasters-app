import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"select"> & {
  options: { label: string; value: string }[];
  placeholder?: string;
};
const Select = ({ placeholder, options, ...props }: Props) => {
  return (
    <select
      className="w-full rounded-lg border border-gray-300 px-2.5 py-3"
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
