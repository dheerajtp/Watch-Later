import React from "react";
import searching from "../assets/search.gif";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={searching} alt="loading" />
    </div>
  );
};

export default Loading;