import React from "react";

const InputError = ({ errorMessage, className }) => {
  if (!errorMessage) return <></>;

  return <p className={`text-xs text-red-500 ${className}`}>{errorMessage}</p>;
};

export default InputError;
