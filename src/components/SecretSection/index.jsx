import React, { useEffect, useState } from "react";
import TypewriterComponent from "typewriter-effect";
import Book2 from "../Book/Book2";
import "./secret.scss";

function SecretSection(props) {
  const { data, setIsPlaying, toggle, playing } = props;
  const [flipState, setFlipState] = useState(Array(data.length).fill(false));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(
    !(currentIndex === 0 || currentIndex === data.length - 1)
  );
  const [isStart, setIsStart] = useState(currentIndex === 0);
  const [zIndex, setZIndex] = useState(
    data.map((a, index) => data.length - index)
  );
  const [isPrev, setIsPrev] = useState(false);

  function goNextPage() {
    console.log(currentIndex);
    if (currentIndex < data.length - 1) {
      const flipStateArr = flipState.slice();
      flipStateArr.splice(currentIndex, 1, true);
      setFlipState(flipStateArr);

      if (currentIndex === 0) {
        setIsOpen(true);
      }
    }
    if (currentIndex === data.length - 1) {
      const flipStateArr = flipState.slice();
      flipStateArr.splice(currentIndex, 1, true);
      setFlipState(flipStateArr);
      setIsStart(false);
      setIsOpen(false);
    }
    setCurrentIndex(currentIndex + 1);
    setIsPrev(false);
  }

  function goPrevPage() {
    if (currentIndex > 0) {
      const flipStateArr = flipState.slice();
      flipStateArr.splice(currentIndex - 1, 1, false);
      setFlipState(flipStateArr);
      setCurrentIndex(currentIndex - 1);
    }
    if (currentIndex === data.length) {
      setIsOpen(true);
      setIsStart(false);
    }
    if (currentIndex === 1) {
      setIsOpen(false);
      setIsStart(true);
    }
    setIsPrev(true);
  }
  useEffect(() => {
    const zIndexArr = zIndex.slice();
    let breakPoint = 0;
    if (flipState.length > 0) {
      for (let i = 0; flipState[i] === true; i++) {
        zIndexArr.splice(i, 1, i + data.length);
        if (flipState[i + 1] === false) breakPoint = i + 1;
      }
      for (let i = breakPoint; flipState[i] === false && i < data.length; i++) {
        const j = i - breakPoint;
        if (isPrev) zIndexArr.splice(i, 1, breakPoint + data.length - j - 1);
        else zIndexArr.splice(i, 1, breakPoint + data.length - j - 2);
      }
    }
    setZIndex(zIndexArr);
  }, [flipState]);

  return (
    <div className="secret-section">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      <Book2
        currentIndex={currentIndex}
        changeCurrentIndex={setCurrentIndex}
        data={data}
        isOpen={isOpen}
        isStart={isStart}
        goNextPage={goNextPage}
        goPrevPage={goPrevPage}
        flipState={flipState}
        zIndex={zIndex}
        setIsPlaying={setIsPlaying}
        toggle={toggle}
        playing={playing}
      />
    </div>
  );
}

export default SecretSection;
