import React from "react";
import "./button.scss";

function Button({ play, isPlaying }) {
  return (
    <div className="btn-custom-container" onClick={play}>
      <div className={isPlaying ? "btn-stop" : "btn-play"}></div>
    </div>
  );
}
export default Button;
