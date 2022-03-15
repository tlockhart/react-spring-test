import React, { useState } from "react";
import { Canvas} from "@react-three/fiber";
import { useSpring, animated, config } from "react-spring/three";
import "./styles.css";

function MyRotatingBox() {
  const myMesh = React.useRef();
  const [active, setActive] = useState(0);

  const { spring } = useSpring({
    // scale: active ? 1.5 : 1,
    // config: config.wobbly
    spring: active,
    config: {mass: 5, tension: 400, friction: 50, precision: 0.0001}
  });

  // useFrame(({ clock }) => {
  //   const a = clock.getElapsedTime();
  //   myMesh.current.rotation.x = a;
  // });
  // const scale = spring.to([0, 1], [1,5])
  const rotation = spring.to([0,1], [0, .5*Math.PI]);
  const color = spring.to([0, 1], ['#6246ea', '#e45858']);

  return (
    <animated.mesh
      rotation-y={rotation}
      onClick={() => setActive(Number(!active))}
      ref={myMesh}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      {/* <meshPhongMaterial color="royalblue" /> */}
      <animated.meshStandardMaterial roughness={0.5} attach="material" color={color} />
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
