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
    const { url, description, question, title } = div;
    if (index === 0)
      return (
        <>
          <div class="front first">
            <div id="f1" class="front-content">
              <h1>Ký sự năm 2021</h1>
              {/* <p>Tác giả</p>
              <p>Luat Dang</p> */}
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
              </div>
            </div>
          </div>
        </>
      );
    if (index === data.length - 1)
      return (
        <>
          <div class="front">
            <div id="f1" class="front-content">
              <h1>The end</h1>
            </div>
          </div>
          <div class="back last">
            <div id="b1" class="back-content ">
              <h1>made by Luat dzai</h1>
            </div>
          </div>
        </>
      );
    return (
      <>
        <div class="front">
          <div id="f1" class="front-content">
            <div className="title-container">Nhân vật</div>
            <div className="content-container">
              <div className="char-intro">
                <div className="line-container">
                  <div className="name">
                    <div className="des">
                      <strong>Chị mình</strong>
                    </div>
                    <img src={url} alt="" />
                  </div>
                  <div className="description">
                    Một người quen qua mạng, nhân vật chính của cuốn ký sự
                  </div>
                </div>
                <div className="line-container">
                  <div className="name">
                    <div className="des">
                      <strong>Mình</strong>
                    </div>
                    <img src={myPic} alt="" />
                  </div>
                  <div className="description">Một người già</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="back">
          <div id="b1" class="back-content">
            <div className="ques-container">Hà Nội, 13/02/2021</div>
            <div className="content-container">
              <div className="line">
                Một ngày trời không mưa nhưng se lạnh. Nhiệt độ cao nhất 22-25
                độ, thấp nhất 14-17 độ. Hôm nay là lần đầu tiên mình giao tiếp
                với chị mình kiểu dài dài and rất zui zẻ. Tầm này năm ngoái chị
                mình đang bị ốm cúm, tay chân cũng hay lạnh, đầu cũng hay đau,
                nghe thương lắm ấy, cũng may có một gentleman như mình bầu bạn.
              </div>
            </div>
            <div className="ques-container">Hà Nội, 14/02/2021</div>
            <div className="content-container">
              <div className="line">
                Thời tiết hôm nay cũng giống hôm qua, and tâm trạng của mình
                cũng vậy - rất zui :3. Hôm nay mình được chị hôm qua bank mừng
                tủi, lại còn tặng mình mấy cái sicula icon nữa, cảm động!.. Cuộc
                trò chuyện hôm nay chủ yếu về đồ tàu và mấy bạn nữ xink xink,
                rất tuyệt! (Trên đây là câu chuyện từ đầu ngày đến 3-4 giờ sáng)
              </div>
              <div className="line">
                Cũng trong ngày hôm nay nma tầm 10 giờ tối, bệnh tình của chị
                diễn biến xấu nên mình an ủi rồi để chị ngủ sớm. Chị yên giấc
                vào đầu ngày mới.
              </div>
            </div>
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
