import React, { useEffect } from "react";
import "./ripple-button.scss";

function RippleButton(props) {
  const { children, ...restProps } = props;
  useEffect(() => {
    const buttons = document.querySelectorAll(".ripple-button");
    console.log(buttons);
    Array.from(buttons).forEach((btn) => {
      console.log(btn);
      btn.addEventListener("click", function (e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        let ripples = document.createElement("span");
        ripples.style.left = `${x}px`;
        ripples.style.top = `${y}px`;
        this.appendChild(ripples);
        setTimeout(() => {
          ripples.remove();
        }, 1000);
      });
    });
  }, []);
  return (
    <button {...restProps} className="ripple-button">
      {children}
    </button>
  );
}

export default RippleButton;
