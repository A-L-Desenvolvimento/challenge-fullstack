import React from "react";

const TextInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
  className,
  min,
  max,
}) => {
  return (
    <input
      type={type}
      className={`border text-sm rounded                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            -lg  block w-full p-2.5 ${className} ${
        error
          ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
          : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-slate-500 focus:border-slate-500"
      }`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  );
};

export default TextInput;
