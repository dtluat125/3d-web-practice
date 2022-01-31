import { useState, useRef, useEffect } from "react";
import "./slider.scss";
import "./thumb.scss";

function Slider({ percentage = 0, onChange }) {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [progressBarHoveredWidth, setProgressBarHoveredWidth] = useState(0);
  const [onHover, setOnHover] = useState(false);

  const rangeRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  const handleHoverBar = (e) => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const rangeX = rangeRef.current.getBoundingClientRect()?.left
    const barWidth = (e?.clientX - rangeX)
    setProgressBarHoveredWidth(barWidth);
  };
  return (
    <div
      className="slider-container"
      onMouseEnter={(e) => {
        handleHoverBar(e);
        setOnHover(true);
      }}
      onMouseMove={(e) => {
        if (!onHover) return;
        handleHoverBar(e);
        console.log(e)
      }}
      onMouseLeave={() => {
        setProgressBarHoveredWidth(0);
        setOnHover(false);
      }}
    >
      <div
        className="progress-bar-cover"
        style={{
          width: `${progressBarWidth}px`,
        }}
      ></div>
      <div
        className="progress-bar-hover-cover"
        style={{
          width: `${progressBarHoveredWidth}px`,
        }}
      ></div>
      <div
        className="thumb"
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></div>
      <input
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        className="range"
        onChange={onChange}
        onM
      />
    </div>
  );
}

export default Slider;
