import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import "./about.scss";
import smokePic from "../../assets/images/smoke-1.png";
import * as THREE from "three";
import { TextureLoader } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Card from "../Card/Card";
import Loader from "../Loader";

function About() {
  const clouds = [];
  const renderClouds = () => {
    for (let i = 0; i < 25; i++) {
      clouds.push(<CloudSky key={i} />);
    }
    return clouds;
  };
  return (
    <div className="about-container">
      {/* <Card /> */}
      <Loader />
      <Canvas
        onCreated={(state) => state.gl.setClearColor("#11111f")}
        // onPointerMissed={() => alert("miss click")}
        resize={{ scroll: true }}
        onResize
        dpr={window.devicePixelRatio}
        camera={{
          fov: 60,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 1000,
          position: [0, 0, 1],
          rotation: [1.16, -0.12, 0.27],
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
        <directionalLight color={0xffeedd} position={[0, 0, 1]} />
        <ambientLight color={0x555555} />
        <pointLight position={[0, 2, 10]} />
        {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}
        <Suspense fallback={null}>
          <fogExp2 color={0x11111f} density={0.002} />
          <Flash />
          <Rain />
          <mesh> {renderClouds()}</mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default About;

function Flash(props) {
  const ref = useRef();
  const animate = () => {
    if (Math.random() > 0.93 || ref.current.power > 100) {
      if (ref.current.power < 100) {
        ref.current.position.set(
          Math.random() * 400,
          300 + Math.random() * 200,
          100
        );
        // console.log(ref.current.power);
      }
      ref.current.power = 50 + Math.random() * 500;
    }
  };
  console.log(ref.current);
  useFrame((state, delta) => animate());
  return <pointLight ref={ref} args={[0x062d89, 30, 500, 1.7]} />;
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

function Rain(props) {
  const rainCount = 15000;
  const ref = useRef();
  const rainRef = useRef();
  const [vertices, velocity] = useMemo(() => {
    let vertices = new Float32Array(rainCount * 3);
    let velocity = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      let rainDrop = [
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200,
      ];
      if (i === 2) console.log(rainDrop);
      // rainDrop.velocity = {};
      // rainDrop.velocity = 0;
      vertices[i] = Math.random() * 400 - 200;
      vertices[i + 1] = Math.random() * 500 - 250;
      vertices[i + 2] = Math.random() * 400 - 200;
      velocity[i] = 0;
      if (i === rainCount - 1) console.log(ref.current);
    }
    // ref.current.setFromPoints(vertices);
    return [vertices, velocity];
  }, []);

  const animate = () => {
    const positions = ref.current.attributes.position.array;
    const velocities = ref.current.attributes.velocity.array;

    for (let i = 0; i < positions.length; i += 3) {
      const v = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      );
      velocities[i] -= 0.1 + Math.random() * 0.1;
      positions[i + 1] = v.y + velocities[i];
      if (positions[i + 1] < -200) {
        positions[i + 1] = Math.random() * 500 - 250;
        velocities[i] = 0;
      }
    }
    rainRef.current.rotation.y += 0.002;
    ref.current.attributes.position.needsUpdate = true;
    ref.current.attributes.velocity.needsUpdate = true;
  };
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => animate());

  return (
    <points ref={rainRef}>
      <bufferGeometry ref={ref}>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={vertices.length / 3}
          itemSize={3}
          array={vertices}
        />
        <bufferAttribute
          attachObject={["attributes", "velocity"]}
          count={velocity.length}
          itemSize={1}
          array={velocity}
        />
      </bufferGeometry>
      <pointsMaterial color={0xaaaaaa} size={0.3} transparent={true} />
    </points>
  );
}
