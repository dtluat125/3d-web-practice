import React, { useEffect, useState } from "react";
import "./book.scss";

function Book(props) {
  const { videoUrl, flipState, isOpen, isStart } = props;

  return (
    <div className="book-container">
      <div
        id="book"
        class={`book ${isOpen ? "open" : ""} ${isStart ? "start" : ""}`}
      >
        {videoUrl.map((video, index) => (
          <div
            id={`p${index}`}
            class={`paper ${flipState[index] ? "flipped" : ""}`}
          >
            <div class="front">
              <div id="f1" class="front-content">
                <h1>Front {index}</h1>
              </div>
            </div>
            <div class="back">
              <div id="b1" class="back-content">
                <h1>Back {index}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Book;
