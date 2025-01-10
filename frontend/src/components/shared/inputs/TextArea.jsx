import React from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";

const TextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  errorMessage,
  className,
  rows = 4,
  cols = 50,
}) => {
  return (
    <div className={`flex flex-col w-full gap-1 ${className}`}>
      <InputLabel label={label} required={required} />
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        className={`border p-2 rounded-md ${
          errorMessage ? "border-red-500" : "border-gray-300"
        } focus:outline-none`}
      />
      <InputError errorMessage={errorMessage} />
    </div>
  );
};

export default TextArea;
