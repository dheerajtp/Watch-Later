import React from "react";
import empty from "../assets/empty.gif";

function Empty() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={empty} alt="empty" />
    </div>
  );
}

export default Empty;
