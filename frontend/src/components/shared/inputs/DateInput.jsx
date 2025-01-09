import React from "react";
import TextInput from "./TextInput";

const DateInput = ({
  label,
  value,
  onChange,
  min,
  max,
  required = false,
  errorMessage,
  className,
}) => {
  return (
    <TextInput
      type="date"
      label={label}
      value={value}
      onChange={onChange}
      required={required}
      errorMessage={errorMessage}
      className={className}
      min={min}
      max={max}
    />
  );
};

export default DateInput;
