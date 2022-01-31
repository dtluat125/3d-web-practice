import {
  LeftCircleFilled,
  RightCircleFilled,
} from "@ant-design/icons/lib/icons";
import React, { useEffect, useState } from "react";
import TypewriterComponent from "typewriter-effect";
import { useAudio } from "../../hooks/audioHook";
import PlayButton from "../PlayButton";
import "./book.scss";
import myPic from "../../assets/images/mypic.png";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

function Book2(props) {
  const {
    data,
    flipState,
    isOpen,
    isStart,
    goPrevPage,
    goNextPage,
    zIndex,
    currentIndex,
    setIsPlaying,
    toggle,
    playing,
  } = props;

  const pageRender = (div, index) => {
    const { titleFront, titleBack, charInfo, dailyNote, audio, stickers } = div;
    if (index === 0)
      return (
        <>
          <div class="front first">
            <div id="f1" class="front-content">
              <h1>Ký sự năm 2021</h1>
              {/* <p>Tác giả</p>
              <p>Luat Dang</p> */}
              <div className="sticker-container">
                <img src="sticker-girl1.png" alt="" />
              </div>
            </div>
          </div>
          <div class="back">
            <div id="b1" class="back-content first">
              <div className="first-container">
                {/* <TypewriterComponent
                  options={{
                    string: ["Tác phẩm dựa trên một câu chuyện có thật."],
                  }}
                /> */}
                <div className="text">
                  Tác phẩm dựa trên một câu chuyện có thật.
                </div>

                <div className="play-button">
                  <div className="text">Nghe mot chut nhac nhe</div>
                  <PlayButton
                    toggle={toggle}
                    playing={playing}
                    setIsPlaying={setIsPlaying}
                    className="book-button"
                  />
                </div>
                <div className="icons">
                  <div className="icon-container">
                    <img src="sticker-banhbao1.png" alt="" />
                  </div>
                </div>
                <div className="notes">
                  <div className="title">Lat sach tu tu thoi khong lag!</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    if (index === data.length - 1)
      return (
        <>
          <div class="front last">
            <div id="f1" class="front-content">
              <h1>The end</h1>
            </div>
          </div>
          <div class="back last">
            <div id="b1" class="back-content ">
              <h1>made by Luat dzai</h1>
              <div className="sticker-container">
                <img src="sticker-girl2.png" alt="" />
              </div>
              <div className="small-note">iu ban!</div>
            </div>
          </div>
        </>
      );
    return (
      <>
        <div class="front">
          <div id="f1" class="front-content">
            <div className="title-container">{titleFront || ""}</div>
            {charInfo?.length && (
              <div className="content-container">
                <div className="char-intro">
                  {charInfo?.map((char, index) => {
                    const { name, des, url } = char;
                    return (
                      <div className="line-container" key={index}>
                        <div className="name">
                          <div className="des">
                            <strong>{name || ""}</strong>
                          </div>
                          <img src={url || ""} alt="" />
                        </div>
                        <div className="description">{des || ""}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {dailyNote
              ?.filter((note) => !note.back)
              ?.map((note, index) => {
                const { dayTitle, dayContent } = note;
                return (
                  <div key={index}>
                    <div className="ques-container">{dayTitle}</div>
                    <div className="content-container">
                      {dayContent?.map((content, index) => (
                        <div className="line" key={index}>
                          {content}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            {audio?.length > 0 &&
              audio
                ?.filter((au) => !au.back)
                .map((au, index) => {
                  const { url } = au;
                  return (
                    <div className="audio-section">
                      <AudioPlayer
                        url={url}
                        toggle={toggle}
                        playing={playing}
                        setIsPlayingOuter={setIsPlaying}
                      />
                    </div>
                  );
                })}
            {stickers?.length > 0 &&
              stickers
                ?.filter((sticker) => !sticker.back)
                .map((sticker, index) => {
                  const { url } = sticker;
                  return (
                    <div className="sticker-container">
                      <img src={url} alt="sticker" />
                    </div>
                  );
                })}
          </div>
        </div>
        <div class="back">
          <div id="b1" class="back-content">
            {dailyNote
              ?.filter((note) => note.back)
              ?.map((note, index) => {
                const { dayTitle, dayContent } = note;
                return (
                  <div key={index}>
                    <div className="ques-container">{dayTitle}</div>
                    <div className="content-container">
                      {dayContent?.map((content, index) => (
                        <div className="line" key={index}>
                          {content}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            {audio?.length > 0 &&
              audio
                ?.filter((au) => au.back)
                .map((au, index) => {
                  const { url } = au;
                  return (
                    <div className="audio-section">
                      <AudioPlayer
                        url={url}
                        toggle={toggle}
                        playing={playing}
                        setIsPlayingOuter={setIsPlaying}
                      />
                    </div>
                  );
                })}
            {stickers?.length > 0 &&
              stickers
                ?.filter((sticker) => sticker.back)
                .map((sticker, index) => {
                  const { url } = sticker;
                  return (
                    <div className="sticker-container">
                      <img src={url} alt="sticker" />
                    </div>
                  );
                })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="book-container">
      <button
        id="prev-btn"
        className={`${currentIndex <= 0 ? "disabled" : ""}`}
        onClick={goPrevPage}
      >
        Prev
      </button>
      <div
        id="book"
        class={`book ${isOpen ? "open" : ""} ${isStart ? "start" : ""}`}
      >
        {data.map((div, index) => {
          return (
            <div
              id={`p${index}`}
              class={`paper ${flipState[index] ? "flipped" : ""}`}
              style={{ zIndex: zIndex[index] }}
              key={index}
            >
              {pageRender(div, index)}
            </div>
          );
        })}
      </div>
      <button
        id="next-btn"
        className={`${currentIndex === data?.length ? "disabled" : ""}`}
        onClick={goNextPage}
      >
        Next
      </button>
    </div>
  );
}

export default Book2;
