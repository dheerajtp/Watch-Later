import React from "react";
import error from "../assets/error.gif";

function Error() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={error} alt="loading" />
    </div>
  );
}

export default Error;
