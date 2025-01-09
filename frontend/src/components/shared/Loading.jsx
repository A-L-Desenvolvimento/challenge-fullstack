import React from "react";
const Loading = ({ isLoading = false, children }) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center my-8">
        <div className="flex gap-2 items-center text-indigo-400">
          <div className="w-5 h-5 border-t-2 border-indigo-400 rounded-full animate-spin" />
          Carregando...
        </div>
      </div>
    );
  } else {
    return children;
  }
};

export default Loading;
