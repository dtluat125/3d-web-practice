import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../../assets/images/profile-pic.png";
import RippleButton from "../RippleButton/RippleButton";

function Card() {
  useEffect(() => {
    //Movement Animation to happen
    const card = document.querySelector(".card");
    const container = document.querySelector(".container");
    //Items
    const title = document.querySelector(".title");
    const profilePicture = document.querySelector(".profile-picture img");
    const purchase = document.querySelector(".purchase");
    const description = document.querySelector(".info h3");
    const sizes = document.querySelector(".sizes");

    //Moving Animation Event
    container.addEventListener("mousemove", (e) => {
      let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
    });
    //Animate In
    container.addEventListener("mouseenter", (e) => {
      // setTimeout(() => {

      // }, 200);
      card.style.transition = "none";
      //Popout
      title.style.transform = "translateZ(150px)";
      profilePicture.style.transform = "translateZ(200px) scale(1.2)";
      description.style.transform = "translateZ(125px)";
      sizes.style.transform = "translateZ(100px)";
      purchase.style.transform = "translateZ(75px)";
    });
    //Animate Out
    container.addEventListener("mouseleave", (e) => {
      card.style.transition = "all 0.5s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      //Popback
      title.style.transform = "translateZ(0px)";
      profilePicture.style.transform = "translateZ(0px) rotateZ(0deg)";
      description.style.transform = "translateZ(0px)";
      sizes.style.transform = "translateZ(0px)";
      purchase.style.transform = "translateZ(0px)";
    });
  }, []);
  let navigate = useNavigate();
  const gotoAboutPage = () => {
    navigate("/recap");
  };
  return (
    <div className="app-container">
      <div class="container">
        <div class="card">
          <div class="profile-picture">
            <div class="circle"></div>
            <img src={profilePic} alt="adidas" />
          </div>
          <div class="info">
            <h2 class="title">Ngọcc 💫</h2>
            <h3>A healing fairy 🧚</h3>
            <div class="sizes">
              <button>🎭 Performance Art</button>
              <button>🏹 Achery</button>
            </div>
            <div class="purchase">
              <RippleButton onClick={gotoAboutPage}>Learn more</RippleButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
