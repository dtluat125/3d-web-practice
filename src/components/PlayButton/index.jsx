import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useAudio } from "../../hooks/audioHook";
import "./index.scss";

function PlayButton(props) {
  const { playing, toggle, setIsPlaying, setPrevIsPlaying, className } = props;
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    console.log("click");
    setActive(!active);
    if (setIsPlaying) setIsPlaying(!playing);
    if (setPrevIsPlaying) setPrevIsPlaying(playing);
    toggle();
  };
  // useEffect(() => {
  //   console.log(playing)
  //   if (!isPlaying && playing) toggle();
  // }, [isPlaying]);
  return (
    <div
      className={`botón ${playing ? "active" : ""} ${className}`}
      role="button"
      onClick={handleToggle}
    >
      <div className="fondo" x="0" y="0" width="200" height="200"></div>
      <div className="icono" width="200" height="200">
        <div
          className="parte izquierda"
          x="0"
          y="0"
          width="50"
          height="50"
          fill="#fff"
        ></div>
        <div
          className="parte derecha"
          x="0"
          y="0"
          width="50"
          height="50"
          fill="#fff"
        ></div>
      </div>
      <div className="puntero"></div>
    </div>
  );
}

export default PlayButton;
