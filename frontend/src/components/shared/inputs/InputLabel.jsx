import React from "react";

const InputLabel = ({ label, required = false, className }) => {
  if (!label) return <></>;

  return (
    <p className={`block text-sm font-bold text-gray-700 ${className}`}>
      {label}
      {required && <span className="ml-2 text-red-500">*</span>}
    </p>
  );
};

export default InputLabel;
