import React from "react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import StyledInput from "./StyledInput";

const TextInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  errorMessage,
  className,
}) => {
  return (
    <div className={`flex flex-col w-full gap-1 ${className}`}>
      <InputLabel label={label} required={required} />
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={errorMessage}
      />
      <InputError errorMessage={errorMessage} />
    </div>
  );
};

export default TextInput;
