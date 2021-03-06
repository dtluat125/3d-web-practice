import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import "./recap.scss";
// import profilePic from "../../assets/images/adidas.png";
import profilePic from "../../assets/images/profile-pic.jpg";
import profilePic2 from "../../assets/images/profile-pic.png";
import image from "../../assets/images/image.jpg";
import image2 from "../../assets/images/image-2.jpg";
import pic2 from "../../assets/images/pic-2.jpg";
import pic3 from "../../assets/images/pic-3.jpg";
import pic5 from "../../assets/images/pic-5.jpg";
import myPic from "../../assets/images/mypic.png";

import smokePic from "../../assets/images/smoke-1.png";
import * as THREE from "three";
import FirstLoader from "../Loader";
import { TextureLoader } from "three";
import {
  Html,
  OrbitControls,
  Sky,
  Stars,
  useProgress,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useNavigate } from "react-router-dom";
import {
  LeftOutlined,
  PlayCircleOutlined,
  RightOutlined,
} from "@ant-design/icons/lib/icons";
import { Modal, Button } from "antd";
import ReactPlayer from "react-player";
import PlayButton from "../PlayButton";
import About from "../About/About";
import { useAudio } from "../../hooks/audioHook";
import Warning from "../Warning/Warning";
import TypewriterComponent from "typewriter-effect";
import RippleButton from "../RippleButton/RippleButton";
import BlackBoardForm from "../BlackBoardForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastInformSuccess } from "../Toast/ToastSuccess";
import SecretSection from "../SecretSection";
import Book from "../Book/Book";

function Recap() {
  const [hover, setHover] = useState(false);

  const [pos, setPos] = useState({ top: 0, left: 0, x: 0, y: 0 });
  const [isDown, setIsDown] = useState(false);
  const [startY, setStartY] = useState(null);
  const [scrollTop, setScrollTop] = useState(null);
  const [saturation, setSaturation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState([""]);
  const [currentIndex, setCurrentIndex] = useState(Array(4).fill(0));
  const [isPic, setIsPic] = useState(false);
  const [boxIndex, setBoxIndex] = useState(0);
  const [warning, setWarning] = useState(false);
  const [playing, toggle] = useAudio("background.mp4");
  const [secretModalOpen, setSecretModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSecretContent, setShowSecretContent] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const createBox = (...boxs) => {
    return boxs.map((box, index) => {
      const { img, text } = box;
      return (
        <Box
          initialAngle={(index * (5 * -Math.PI)) / 9}
          index={index}
          key={index}
          {...box}
          setHover={setHover}
          hover={hover}
          setIsModalOpen={setIsModalOpen}
          setVideoUrl={setVideoUrl}
          setIsPic={setIsPic}
          setBoxIndex={setBoxIndex}
          lastIndex={index === boxs.length - 2}
          setWarning={setWarning}
          setSecretModalOpen={setSecretModalOpen}
          setIsModalLoading={setIsModalLoading}
        />
      );
    });
  };
  // useEffect(() => {
  //   const ele = document.querySelector(".recap-container");
  //   const mouseDownHandler = function (e) {
  //     if (!ele) return;
  //     setIsDown(true);
  //     setStartY(e.pageY);
  //     console.log(isDown);
  //     setScrollTop(ele.scrollTop);
  //   };
  //   const mouseMoveHandler = function (e) {
  //     if (!ele) return;
  //     if (!isDown) return;
  //     // How far the mouse has been moved
  //     const dy = e.pageY - startY;
  //     ele.scrollTop = dy;
  //     console.log(isDown);
  //     e.preventDefault();
  //   };
  //   const mouseUpHandler = function () {
  //     if (!ele) return;
  //     ele.removeEventListener("mousemove", mouseMoveHandler);
  //     ele.removeEventListener("mouseup", mouseUpHandler);
  //   };
  //   ele.addEventListener("mousedown", mouseDownHandler);
  //   ele.addEventListener("mousemove", mouseMoveHandler);
  //   ele.addEventListener("mouseup", mouseUpHandler);
  // }, []);
  useEffect(() => {
    window.onload = function () {
      document.body.classList.add("loaded");
    };
  }, []);
  useEffect(() => {}, []);
  let navigate = useNavigate();
  const goToHomepage = () => {
    if (playing) toggle();
    console.log(playing);
    setTimeout(() => {
      navigate("/");
    }, 200);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isPlaying && !playing) toggle();
  };
  const handleCloseSecretModal = () => {
    setSecretModalOpen(false);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (playing) {
      console.log(isPlaying);
      setIsPlaying(true);
    }
  }, [playing]);

  const changeCurrentIndex = (value) => {
    const currentIndexArr = currentIndex.slice();
    currentIndexArr.splice(boxIndex, 1, value);
    setCurrentIndex(currentIndexArr);
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [password, setPassword] = useState("");
  const onPasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (loggedIn)
      setTimeout(() => {
        setShowSecretContent(true);
      }, 500);
  }, [loggedIn]);
  const pass = "17082002";
  const onSubmit = () => {
    if (pass === password) {
      setLoggedIn(true);
      toastInformSuccess("Access granted!");
      setIsModalLoading(true);
      setTimeout(() => setIsModalLoading(false), 2000);
      return;
    }
    toastError("Please try again, wrong passcode!");
    return;
  };

  // Book state

  const [flipState, setFlipState] = useState(
    Array(videoUrl.length).fill(false)
  );
  const [isOpen, setIsOpen] = useState(
    !(
      currentIndex[boxIndex] === 0 ||
      currentIndex[boxIndex] === videoUrl.length - 1
    )
  );
  const [isStart, setIsStart] = useState(currentIndex[boxIndex] === 0);
  function goNextPage() {
    if (currentIndex[boxIndex] < videoUrl.length - 1) {
      const flipStateArr = flipState.slice();
      flipStateArr.splice(currentIndex[boxIndex], 1, true);
      setFlipState(flipStateArr);
      if (isOpen) changeCurrentIndex(currentIndex[boxIndex] + 1);
      if (currentIndex[boxIndex] === 0) {
        setIsOpen(true);
      }
    }
    if (currentIndex[boxIndex] === videoUrl.length - 1) {
      const flipStateArr = flipState.slice();
      flipStateArr.splice(currentIndex[boxIndex], 1, true);
      setFlipState(flipStateArr);
      setIsStart(false);
      setIsOpen(false);
    }
  }

  function goPrevPage() {
    if (currentIndex[boxIndex] > 0) {
      const flipStateArr = flipState.slice();
      flipStateArr.splice(currentIndex[boxIndex], 1, false);
      setFlipState(flipStateArr);
      if (isOpen) changeCurrentIndex(currentIndex[boxIndex] - 1);
    }
    if (currentIndex[boxIndex] === videoUrl.length - 1) setIsOpen(true);
    if (currentIndex[boxIndex] === 0) {
      const flipStateArr = flipState.slice();
      flipStateArr.splice(currentIndex[boxIndex], 1, false);
      setFlipState(flipStateArr);
      setIsOpen(false);
      setIsStart(true);
    }
  }

  return (
    <div className={`recap-container ${hover ? "cursor-pointer" : ""}`}>
      {isModalLoading && loggedIn && <FirstLoader />}
      {secretModalOpen && (
        <Modal
          footer={null}
          width="auto"
          visible={secretModalOpen}
          destroyOnClose
          closable
          className="modal-secret"
          onCancel={handleCloseSecretModal}
          centered
        >
          {!loggedIn ? (
            <BlackBoardForm
              password={password}
              onPasswordChange={onPasswordChange}
              onSubmit={onSubmit}
            />
          ) : (
            <SecretSection
              data={[
                { question: "", url: "", description: "" },
                {
                  titleFront: "Nh??n v???t",
                  charInfo: [
                    {
                      name: "Ch??? m??nh",
                      des: "M???t chuy??n v??n s??u s???c",
                      url: profilePic2,
                    },
                    {
                      name: "M??nh",
                      des: "M???t ng?????i gi??",
                      url: myPic,
                    },
                  ],
                  titleBack: "",
                  dailyNote: [
                    {
                      dayTitle: "13/02/2021",
                      dayContent: [
                        "M???t ng??y tr???i H?? N???i kh??ng m??a nh??ng se l???nh. Nhi???t ????? cao nh???t 22-25 ?????, th???p nh???t 14-17 ?????. H??m nay l?? l???n ?????u ti??n m??nh giao ti???p v???i ch??? m??nh ki???u d??i d??i and r???t zui z???. T???m n??y n??m ngo??i ch??? m??nh ??ang b??? ???m c??m, tay ch??n hay l???nh, ?????u c??ng hay ??au, nghe th????ng l???m ???y, c??ng may c?? m???t gentleman nh?? m??nh b???u b???n.",
                      ],
                      back: true,
                    },
                    {
                      dayTitle: "14/02/2021",
                      dayContent: [
                        "Th???i ti???t h??m nay c??ng gi???ng h??m qua, and t??m tr???ng c???a m??nh c??ng v???y. H??m nay m??nh ???????c ch??? h??m qua bank m???ng t???i, l???i c??n t???ng m??nh m???y c??i sicula icon n???a, c???m ?????ng!.. Cu???c tr?? chuy???n h??m nay ch??? y???u v??? ???m th???c trung hoa v?? c??c m??? n??? v??ng cao, r???t tuy???t!",
                        "????m nay, ch??? m??nh c??? k??u ch??n nma b???nh t??nh c???a ch??? di???n bi???n x???u n??n m??nh an ???i r???i ????? ch??? ng??? s???m. Ch??? y??n gi???c v??o ?????u ng??y m???i TT.",
                      ],
                      back: true,
                    },
                  ],
                },
                {
                  dailyNote: [
                    {
                      dayTitle: "????m 15 r???ng s??ng 16",
                      dayContent: [
                        "H??m nay ch??? m??nh ki???u si??u ch??n n??n r??? m??nh ch??i game nh??ng v??o game th?? c??? gi???t lag xong kh??ng ch??i ???????c. M??nh v?? ?????ng ?????i ki???u v????ng qu???c thi???u v???ng n??? c?????i :). Nh??ng m??nh v???n tha th??? cho c??? v?? m???y c??i voice si??u cute :>",
                      ],
                      back: false,
                    },
                    {
                      dayTitle: "????m 16 r???ng s??ng 17",
                      dayContent: [
                        "Cu???i c??ng c??ng ?????i ???????c ?????n ng??y ch??i game c??ng b?? ch???, m???t bu???i t???i kh?? zui z???, thua th?? v???n thua nma zui th?? v???n zui :D. H??m nay m??nh c?? tr???i l??ng m???t ch??t v???i m???y ng?????i ?????ng ?????i n??n b?? ch??? ch??? m??nh h??i l??u :>",
                        "Sau ???? ch??ng m??nh c?? cu???c tr?? chuy???n r???t zui v?? b??? ??ch v??? kinh nghi???m t??nh tr?????ng c???a c??? :).",
                      ],
                      back: true,
                    },
                  ],
                  audio: [
                    {
                      url: "mascara.mp4",
                      back: false,
                    },
                    {
                      url: "mattroi.mp4",
                      back: false,
                    },
                    {
                      url: "braytrongthanhpho.mp4",
                      back: false,
                    },
                  ],
                  stickers: [
                    {
                      url: "sticker-meo.png",
                      back: true,
                    },
                    {
                      url: "sticker-bunny1.png",
                      back: false,
                    },
                  ],
                },
                {
                  dailyNote: [
                    {
                      dayTitle: "Ng??y 17 sau khi m??nh t???nh gi???c",
                      dayContent: [
                        "H??m nay h??i tr???m l???ng m???t ch??t..",
                        "B???n m??nh c?? t??m s??? m???t ch??t v??? chuy???n h???c h??nh...",
                        "????m nay ch??ng ta ??i ng??? r???t s???m hehe.",
                      ],
                      back: false,
                    },
                    {
                      dayTitle: "Ng??y 18 and r???ng s??ng ng??y 19",
                      dayContent: [
                        "H??m nay ch??? m??nh ??i date v???i b??? c??, c???y ???????c ??i ch??i n??n tr??u m??nh ??c..",
                        "??i ch??i v??? xong v???n tr??u :)",
                        "C??? ng??y h??m nay ta ch??? tr??u nhau xong d???, bcuoi vl :>, ???????c c??i b?? ch??? xin l???i c??ng th??nh t??m n??n m??nh tha th??? ?????y!",
                      ],
                      back: true,
                    },
                  ],
                  stickers: [
                    {
                      url: "sticker-banhbao3.png",
                      back: false,
                    },
                    {
                      url: "sticker-gau.webp",
                      back: true,
                    },
                  ],
                  audio: [
                    {
                      url: "creep.mp4",
                      back: true,
                    },
                    {
                      url: "thanhxuan.mp4",
                      back: true,
                    },
                  ],
                },
                {
                  dailyNote: [
                    {
                      dayTitle: "????m 19 r???ng s??ng 20",
                      dayContent: [
                        "H??m nay l?? m???t ng??y zui, ch??? em m??nh tr??u nhau nh?? m???i khi.",
                        "Ch??? hi???u sao nma b?? ch??? h??m nay c?? v??? ????ng iu h??n m???i h??m..",
                      ],
                      back: false,
                    },
                    {
                      dayTitle: "20/02/2021",
                      dayContent: [""],
                      back: true,
                    },
                    {
                      dayTitle: "...",
                      back: true,
                    },
                    {
                      dayTitle: "17/08/2021",
                      dayContent: [
                        "Nay sinh nh???t b?? ch???, t??i c?? bank m???ng tu???i b??? hehe",
                      ],
                      back: true,
                    },
                    {
                      dayTitle: "...",
                      back: true,
                    },
                    {
                      dayTitle: "????m 30/12/2021, r???ng s??ng 31/12/2021",
                      dayContent: [
                        "L??u r???i m???i n??i chuy???n l???i v???i b?? ch???, c??ng r???t zui hi",
                        "H??m nay c??n xem film chung c??, th???t l?? kh??ng ai ng???!!",
                        "...",
                        "M??nh r???t th???c m???c t???i sao m???t ng?????i c?? th??? ????ng iu l??u ?????n z!??",
                      ],
                      back: true,
                    },
                  ],
                  audio: [
                    {
                      url: "chucbengungon.mp4",
                      back: false,
                    },
                  ],
                  stickers: [
                    {
                      url: "sticker-banhbao4.png",
                      back: false,
                    },
                  ],
                },
                {
                  dailyNote: [
                    {
                      dayTitle: "31/01/2022 d????ng l???ch (t???c 29 t???t)",
                      dayContent: [
                        "N???u b?? ch??? c?? ??ang ?????c nh???ng d??ng n??y th?? ch???c h???n l?? ng??y h??m nay r???i v?? t??i t??nh z m??!",
                        "",
                        "????y kh??ng h???n l?? th??? k?? trong v??n h???c nma nghe k?? s??? nghe n?? nghi??m t??c h??n ????ng hok!? ?????ng b???t b??? nka!",
                        "V??i l???i nh???n nh??? ?????n b?? ch??? n??:",
                        "?????u ti??n th?? xin ch??n th??nh c??m ??n b?? ch???, s??? xu???t hi???n c???a b?? ch??? c?? th??? n??i l?? m???t trong nh???ng y???u t??? b?????c ngo???t trong n??m 2021 c???a t??i. T???t nhi??n b?????c ngo???t theo h?????ng r???t t??ch c???c n??n t??i r???t bi???t ??n b?? ch???!",
                        "Ti???p ?????n l?? l???i ch??c s???c kh???e, sang th???m n??m m???i r???i, mong b?? ch??? sau n??y v???n lu??n zui t????i nh?? nh???ng ????a hoa nh??!!",
                      ],
                      back: false,
                    },
                    {
                      dayTitle: "G??c b??t",
                      dayContent: [
                        "Ch??c m???ng n??m m???ii!!",
                        "B?? ch??? ????ng iu l???mm!",
                      ],
                      back: true,
                    },
                  ],
                  stickers: [
                    {
                      url: "sticker-tho1.png",
                      back: true,
                    },
                  ],
                  audio: [
                    {
                      url: "flower.mp4",
                      back: true,
                    },
                  ],
                },
                { question: "", url: "", description: "" },
              ]}
              setIsPlaying={setIsPlaying}
              toggle={toggle}
              playing={playing}
            />
          )}
        </Modal>
      )}
      {isLoading && <FirstLoader />}(
      <div className="">
        {isModalOpen && (
          <Modal
            width="100%"
            height="calc(100vh - 100px) "
            footer={null}
            visible={isModalOpen}
            destroyOnClose
            closable
            className="modal-video"
            onCancel={handleCloseModal}
            centered
          >
            <RightOutlined
              className={`right-icon ${
                currentIndex[boxIndex] >= videoUrl.length - 1 ? "disabled" : ""
              }`}
              role="button"
              onClick={() => {
                if (currentIndex[boxIndex] > videoUrl.length - 1) return;
                goNextPage();
              }}
            />
            <LeftOutlined
              className={`left-icon ${
                currentIndex[boxIndex] <= 0 ? "disabled" : ""
              }`}
              role="button"
              onClick={() => {
                if (currentIndex[boxIndex] < 0) return;
                goPrevPage();
              }}
            />
            <div className="dots-group">
              {videoUrl.map((video, index) => (
                <div
                  className={`dot ${
                    index === currentIndex[boxIndex] ? "active" : ""
                  }`}
                  role="button"
                  onClick={() => changeCurrentIndex(index)}
                ></div>
              ))}
            </div>
            {videoUrl[currentIndex[boxIndex]].isVid ? (
              <ReactPlayer
                width={"100%"}
                height="100%"
                url={videoUrl[currentIndex[boxIndex]].url}
                controls
                // muted
                playing
                onStart={() => {
                  if (playing) toggle();
                  console.log("onStart", playing);
                }}
                onEnded={() => {
                  if (currentIndex[boxIndex] === videoUrl.length - 1) return;
                  changeCurrentIndex(currentIndex[boxIndex] + 1);
                }}
              />
            ) : (
              <div className="img-wrapper">
                <img src={videoUrl[currentIndex[boxIndex]].url} alt="" />
              </div>
            )}
          </Modal>
        )}
        <div className="button-play-music">
          <PlayButton
            url={"background.mp4"}
            setIsPlaying={setIsPlaying}
            toggle={toggle}
            playing={playing}
          />
        </div>
        <div className="content-container">
          <div
            className="logo animate-charcter"
            role="button"
            onClick={goToHomepage}
          >
            VMN
          </div>
        </div>
        <div className="instruction-container">
          <h1 className="letterDrop">Scroll!</h1>
        </div>
        <Canvas
          className="background"
          onCreated={(state) => state.gl.setClearColor("#11111f")}
          // onPointerMissed={() => alert("miss click")}
          resize={{ scroll: false }}
          onResize
          dpr={window.devicePixelRatio}
          camera={{
            fov: 70,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000,
            position: [0, 1, 5],
          }}
        >
          {/* <PerspectiveCamera
            fov={60}
            aspect={window.innerWidth / window.innerHeight}
            near={0.1}
            far={1000}
            position={[0, 0, 1]}
            rotation={[1.16, -0.12, 0.27]}
          /> */}
          {/* <directionalLight color={0xffeedd} position={[0, 0, 1]} /> */}
          {/* <pointLight position={[0, 2, 10]} /> */}
          {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}
          <Suspense fallback={null}>
            {/* <color attach="background" args={[255, 255, 255]}/> */}
            {/* <CloudSky /> */}

            <Sky
              distance={45000} // Camera distance (default=450000)
              sunPosition={[5, 1, 8]} // Sun position normal (defaults to inclination and azimuth if not set)
              inclination={1} // Sun elevation angle from 0 to 1 (default=0)
              azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
              // {...props} // All three-stdlib/objects/Sky props are valid
            />
            <pointLight
              visible
              intensity={1}
              debug
              color="white"
              position={[0, 200, 0]}
              rotation={[Math.PI / -2.5, 0, 0]}
            />
            {/* <ambientLight color={0xffffff} /> */}
            {/* <Environment preset={null} background="white" /> */}
            {/* <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/712170220&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          ></iframe>
          <div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;">
            <a
              href="https://soundcloud.com/user-49494067"
              title="Melody.wav"
              target="_blank"
              style="color: #cccccc; text-decoration: none;"
            >
              Melody.wav
            </a>{" "}
            ??{" "}
            <a
              href="https://soundcloud.com/user-49494067/sai-gon-y-van-vmn-ft-lam-thorn"
              title="S??i G??n - Y V??n (VMN ft. L??m Thorn)"
              target="_blank"
              style="color: #cccccc; text-decoration: none;"
            >
              S??i G??n - Y V??n (VMN ft. L??m Thorn)
            </a>
          </div> */}
            {createBox(
              {
                greyImg: image2,
                img: pic2,
                text: "Super prettyyy!",
                videoUrl: [
                  { url: "video1.mp4", isVid: true },
                  { url: "video4.mp4", isVid: true },
                  { url: "video5.mp4", isVid: true },
                ],
              },
              {
                greyImg: image,
                img: pic5,
                text: "Super dancerrr!",
                videoUrl: [
                  { url: "video3.mp4", isVid: true },
                  { url: "video6.mp4", isVid: true },
                ],
              },
              {
                greyImg: pic3,
                img: pic3,
                text: "Super vocal!!",
                videoUrl: [
                  {
                    url: "music3.mp4",
                    isVid: true,
                  },
                  {
                    url: "music4.mp4",
                    isVid: true,
                  },
                  {
                    url: "music1.mp4",
                    isVid: true,
                  },
                  {
                    url: "music2.mp4",
                    isVid: true,
                  },
                  {
                    url: "https://api.soundcloud.com/tracks/712170220&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
                    isVid: true,
                  },
                ],
              },
              {
                greyImg: image,
                img: profilePic,
                text: "Siucaphocba!! !",
                videoUrl: [
                  { url: "pic-4.jpg", isVid: false },
                  { url: "pic-6.jpg", isVid: false },
                ],
                imgUrl: pic5,
                isPic: true,
              },
              {
                text: "Siucaphocba!! !",
                videoUrl: ["pic-4.jpg"],
                imgUrl: pic5,
                isPic: true,
                isDivOnly: true,
              }
            )}
            <Stars
              radius={100} // Radius of the inner sphere (default=100)
              depth={100} // Depth of area where stars should fit (default=50)
              count={5000} // Amount of stars (default=5000)
              factor={4} // Size factor (default=4)
              saturation={0} // Saturation 0-1 (default=0)
              fade // Faded dots (default=false)\
            />
          </Suspense>
        </Canvas>
      </div>
      )
    </div>
  );
}

export default Recap;

function Box({
  initialAngle = 0,
  img,
  index,
  text,
  hover,
  setHover,
  setIsModalOpen,
  videoUrl,
  setVideoUrl,
  isPic,
  setIsPic,
  isDivOnly,
  setBoxIndex,
  lastIndex,
  setWarning,
  setSecretModalOpen,
  setIsModalLoading,
  ...props
}) {
  const boxRef = useRef();
  const groupRef = useRef();
  const radius = 5;
  const [showText, setShowText] = useState(false);
  // const [currentTimeline, setCurrentTimeline] = useState(window.scrollY / 300);
  // const [aimTimeline, setAimTimeline] = useState(window.scrollY / 300);
  const currentTimeline = useRef(0 + initialAngle / (2 * Math.PI));
  const aimTimeline = useRef(0 + initialAngle / (2 * Math.PI));
  // const { camera } = useThree();

  function setBackground(texture, planeWidth, planeHeight) {
    let imgRatio = texture.image.width / texture.image.height;
    let planeRatio = planeWidth / planeHeight;
    let ratio = planeRatio / imgRatio;
    texture.repeat.set(ratio, 1);
    texture.offset.x = 0.5 * (1 - ratio);
  }
  const handleClick = () => {
    if (boxRef.current.position.z < 0.2 || isDivOnly) return;
    setVideoUrl(videoUrl);
    setIsPic(isPic);
    setBoxIndex(index);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const scrollText = document.querySelector(".letterDrop");
    if (!boxRef) return;
    const detectText = () => {
      if (!boxRef?.current) return;
      if (boxRef.current.position.z > 0.5) {
        setShowText(true);
      } else setShowText(false);
    };
    detectText();
    window.addEventListener("scroll", function (e) {
      if (lastIndex) {
        if (!boxRef?.current) return;
        if (boxRef.current.position.y > 0) {
          setWarning(true);
        }
      }
      const screenHeight = window.innerHeight;
      aimTimeline.current =
        (window.scrollY * 0.5) / screenHeight + initialAngle / (2 * Math.PI);
      if (window.scrollY > 2) {
        scrollText.classList.add("hidden");
      } else scrollText.classList.remove("hidden");
      detectText();
    });
    window.addEventListener(
      "resize",
      setBackground(
        texture,
        boxRef.current.geometry.parameters.width,
        boxRef.current.geometry.parameters.height
      )
    );
    // Handle text in card
    const text = document.querySelector(`.card-text-${index}`);
    const setTextPosition = () => {
      if (!text) return;
      text.parentElement.parentElement.parentElement.style.position = "fixed";
      text.parentElement.classList.add("card-text-container");
      text.parentElement.addEventListener("mouseenter", () => {
        if (boxRef.current.position.z > 0.5) setHover(true);
      });
      text.parentElement.addEventListener("mouseleave", () => {
        setHover(false);
      });
    };
    setTextPosition();
    if (text) text.parentElement.style.transformStyle = "preserve-3d";
    if (text && hover) {
      text.classList.add("active");
    } else text.classList.remove("active");
  }, [hover, index, initialAngle]);
  const angle = useMemo(() => {
    let angle = new Float32Array(1);
    angle[0] = 0 + initialAngle;
    return angle;
  }, []);
  useEffect(() => {
    console.log(boxRef.current);
  }, []);
  const [meshPic, setMeshPic] = useState(img || "pic-4.jpg");
  const changeImage = () => {
    if (isDivOnly) return;
    setHover(true);
    return;
  };
  const texture = useLoader(TextureLoader, meshPic);
  function planeCurve(g, z) {
    let p = g.parameters;
    let hw = p.width * 0.5;

    let a = new THREE.Vector2(-hw, 0);
    let b = new THREE.Vector2(0, z);
    let c = new THREE.Vector2(hw, 0);

    let ab = new THREE.Vector2().subVectors(a, b);
    let bc = new THREE.Vector2().subVectors(b, c);
    let ac = new THREE.Vector2().subVectors(a, c);

    let r =
      (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));

    let center = new THREE.Vector2(0, z - r);
    let baseV = new THREE.Vector2().subVectors(a, center);
    let baseAngle = baseV.angle() - Math.PI * 0.5;
    let arc = baseAngle * 2;

    let uv = g.attributes.uv;
    let pos = g.attributes.position;
    let mainV = new THREE.Vector2();
    for (let i = 0; i < uv.count; i++) {
      let uvRatio = 1 - uv.getX(i);
      let y = pos.getY(i);
      mainV.copy(c).rotateAround(center, arc * uvRatio);
      pos.setXYZ(i, mainV.x, y, +mainV.y);
    }

    pos.needsUpdate = true;
  }

  function changeMove(geo) {
    let position = geo.attributes.position;
    let uv = geo.attributes.uv;

    // position.needsUpdate = true;
  }
  const animate = () => {
    const d = aimTimeline.current - currentTimeline.current;
    currentTimeline.current +=
      (aimTimeline.current - currentTimeline.current) * 0.1;
    const angle = boxRef.current.geometry.attributes.angle.array;
    angle[0] = currentTimeline.current * Math.PI * 2;
    const rx = angle[0] + Math.PI / 2;
    const rz = angle[0];
    boxRef.current.position.x = Math.cos(rx) * radius;
    boxRef.current.position.z = Math.cos(rz) * radius - 3;
    boxRef.current.position.y = currentTimeline.current * 8;
    boxRef.current.rotation.y = -angle[0];

    planeCurve(boxRef.current.geometry, -10);
    changeMove(boxRef.current.geometry);

    // const position = boxRef.current.geometry.attributes.position.array;
    // for (let i = 0; i < position.length; i += 3) {
    //   const v = new THREE.Vector3(
    //     position[i],
    //     position[i + 1],
    //     position[i + 2]
    //   );
    //   if (!d) {
    //     // console.log(v);
    //   }
    //   position[i] = v.y;
    // }

    // boxRef.current.geometry.vertices.map((v) => {});
    boxRef.current.geometry.attributes.position.needsUpdate = true;
    // if (boxRef.current.position.y > 5) {
    //   boxRef.current.position.y = -5;
    // }
    // boxRef.current.position.z += 0.01;
    boxRef.current.geometry.attributes.angle.needsUpdate = true;
  };
  useFrame(() => {
    animate();
  }, []);

  return (
    <mesh
      {...props}
      ref={boxRef}
      onPointerEnter={changeImage}
      onPointerLeave={() => {
        setHover(false);
      }}
      onClick={handleClick}
    >
      {/* <div className="info">Hello</div> */}
      <planeGeometry args={[2.8, 1.6, 50, 50]}>
        <bufferAttribute
          attachObject={["attributes", "angle"]}
          array={angle}
          itemSize={1}
          count={1}
        />
      </planeGeometry>
      <meshBasicMaterial
        map={img ? texture : null}
        color={"rgba(202, 202, 202, 0.563)"}
        opacity={isDivOnly ? 0 : 0.9}
        side={THREE.DoubleSide}
        transparent={isDivOnly}
        // wireframe={true}
        // alphaMap={texture}
      >
        {/* <texture
          attach="map"
          image={texture}
          onUpdate={(self) => (self.needsUpdate = true)}
        /> */}
      </meshBasicMaterial>
      <Html
        // prepend // Project content behind the canvas (default: false)
        // center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
        fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
        distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
        zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
        // portal={boxRef.current.geometry} // Reference to target container (default=undefined)
        transform // If true, applies matrix3d transformations (default=false)
        // sprite // Renders as sprite, but only in transform mode (default=false)
        // occlude={[groupRef]}
        calculatePosition={(el, camera, size) => [
          boxRef.current.position.x,
          boxRef.current.position.y,
          boxRef.current.position.z,
        ]} // Override default positioning function. May be removed in the future (default=undefined) [ignored in transform mode]
        // {...groupProps} // All THREE.Group props are valid
        // {...divProps} // All HTMLDivElement props are valid
        className={`card-text card-text-${index} ${
          !showText ? `collapse` : ""
        } ${isDivOnly ? "div-only" : ""}`}
      >
        {!isDivOnly ? (
          <>
            <div>
              <p>{text}</p>
            </div>
            <div className="play-icon" onClick={handleClick}>
              <PlayCircleOutlined />
            </div>
          </>
        ) : (
          <>
            <div className="warning-container">
              {/* <Warning /> */}

              <TypewriterComponent
                options={{
                  strings: [
                    "Content from this point onward...",
                    "is not for everyone...",
                    "Do you want to proceed?",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
              {/* <div> is only for the right person</div> */}
              <div></div>
            </div>
            <div className="button-group">
              <Button
                type="primary"
                className="button"
                onClick={() => {
                  setSecretModalOpen(true);
                }}
              >
                yes
              </Button>
            </div>
          </>
        )}
      </Html>
    </mesh>
  );
}
function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function CloudSky(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const animate = () => {
    ref.current.rotation.z -= 0.002;
  };
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => animate());
  // Return the view, these are regular Threejs elements expressed in JSX
  const loader = useLoader(TextureLoader, smokePic);
  return (
    <mesh
      {...props}
      ref={ref}
      // onPointerOver={(event) => hover(true)}
      // onPointerOut={(event) => hover(false)}
      position={[Math.random() * 800 - 400, 500, Math.random() * 500 - 450]}
      rotation={[1.16, -0.12, Math.random() * 360]}
      // material={{ opacity: 0.6 }}
    >
      <planeBufferGeometry args={[500, 500]} />
      <meshLambertMaterial map={loader} transparent={true} opacity={0.6} />
    </mesh>
  );
}
