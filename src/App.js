import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "react-spring/three";
import "./styles.css";

function MyRotatingBox() {
  const myMesh = React.useRef();
  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </animated.mesh>
  );
}

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <MyRotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  );
}
