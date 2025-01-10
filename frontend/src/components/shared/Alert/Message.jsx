import React from "react";

const Message = ({ type, text }) => {
  const styles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  if (text) {
    return (
      <div
        className={`${styles[type]} p-3 rounded-md mb-4 shadow-md text-center`}
      >
        {text}
      </div>
    );
  }
};

export default Message;
