import React from "react";

const StyledButton = ({
  label = "Button",
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  disabled = false,
}) => {
  const variants = {
    primary:
      "disabled:bg-indigo-900 bg-indigo-500 text-white hover:bg-indigo-700",
    secondary: "disabled:bg-gray-900 bg-gray-500 hover:bg-gray-700 text-white",
    success: "disabled:bg-green-900 bg-green-500 hover:bg-green-800 text-white",
    danger: "disabled:bg-red-900 bg-red-500 hover:bg-red-600 text-white",
    warning:
      "disabled:bg-yellow-900 bg-yellow-500 hover:bg-yellow-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center px-3 py-2 font-semibold rounded-md ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export default StyledButton;
