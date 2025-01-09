import React from "react";
import StyledButton from "./StyledButton";

const CustomButton = ({
  onClick,
  label = "Custom Button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  return (
    <StyledButton
      label={label}
      onClick={onClick}
      variant={variant}
      className={className}
      disabled={disabled}
    />
  );
};

export default CustomButton;
