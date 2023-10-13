import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment, Html, useGLTF, ContactShadows } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a as three } from "@react-spring/three";
import { a as web } from "@react-spring/web";
import HeroPage from "./HeroPage";
import CameraControls from "camera-controls";
import LockScreen from "/public/LockScreen.png";
import { Avatar } from "./Avatar";
import { motion } from "framer-motion-3d";

CameraControls.install({ THREE });

function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y - 0.8, focus.z + 1.8) : pos.set(0, 0, 6);
    zoom ? look.set(focus.x, focus.y - 0.8, focus.z - 1.8) : look.set(0, 0, 3);

    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true
    );
    return controls.update(delta);
  });
}

function Laptop({
  zoomToView,
  spring,
  focused,
  handleOpen,
  handleFocus,
  c = new THREE.Color(),
  ...props
}) {
  const group = useRef();

  const { nodes, materials } = useGLTF("models/Laptop.glb");

  const [hovered, setHovered] = useState(false);
  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  const texture = useLoader(THREE.TextureLoader, LockScreen);

  return (
    <group
      scale={[0.2, 0.2, 0.2]}
      ref={group}
      onClick={(e) => (e.stopPropagation(), handleOpen(!open))}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
      dispose={null}
      {...props}
    >
      <three.group
        rotation-x={spring.open.to([0, 1], [1.575, 0])}
        position={[0, -0.04, 0.41]}
      >
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          {!focused && (
            <mesh
              geometry={nodes["Cube008_2"].geometry}
              onClick={(e) => (
                e.stopPropagation(),
                zoomToView(e.object.position),
                handleFocus(!focused)
              )}
            >
              <meshBasicMaterial attach="material" map={texture} />
            </mesh>
          )}
          {focused && (
            <mesh
              material={materials["screen.001"]}
              geometry={nodes["Cube008_2"].geometry}
              onPointerMissed={(e) => (
                e.stopPropagation(),
                zoomToView(e.position),
                handleFocus(!focused)
              )}
            >
              <Html
                className="content"
                rotation-x={-Math.PI / 2}
                position={[0, 0.05, -0.09]}
                transform
                occlude
              >
                <div
                  className="wrapper"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <HeroPage />
                </div>
              </Html>
            </mesh>
          )}
        </group>
      </three.group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}

function Scene({ zoomToView }) {
  const ref = useRef();

  const [open, setOpen] = useState(false);
  const spring = useSpring({ open: Number(open) });
  const handleOpen = (open) => {
    setOpen((value) => !value);
  };

  const [focused, setFocus] = useState(false);
  const handleFocus = (focused) => {
    setFocus((value) => !value);
  };

  const [characterAnimation, setCharacterAnimation] = useState("Sitting Down");
  useEffect(() => {
    if (open && !focused) {
      setCharacterAnimation((prevCharacterAnimation) =>
        prevCharacterAnimation === "Sitting Down" ? "Standing Up" : "Idle"
      );
      setTimeout(() => {
        setCharacterAnimation((prevCharacterAnimation) =>
          prevCharacterAnimation === "Standing Up" ? "Idle" : "Idle"
        );
      }, 3000);
    } else if (open && focused) {
      setCharacterAnimation((prevCharacterAnimation) =>
        prevCharacterAnimation === "Idle" ? "Arm Gesture" : "Idle"
      );
      setTimeout(() => {
        setCharacterAnimation((prevCharacterAnimation) =>
          prevCharacterAnimation === "Arm Gesture" ? "Idle" : "Idle"
        );
      }, 3000);
    } else if (!open) {
      setCharacterAnimation((prevCharacterAnimation) =>
        prevCharacterAnimation === "Sitting Down" ? "Sitting Down" : "Waving"
      );
    }
  }, [open, focused]);

  return (
    <group ref={ref}>
      <Laptop
        position={[0, -1.5, -0.7]}
        castShadow
        receiveShadow
        zoomToView={zoomToView}
        spring={spring}
        focused={focused}
        handleOpen={handleOpen}
        handleFocus={handleFocus}
      />
      <motion.group
        position={[1.3, -1.7, -0.6]}
        rotation={[1.611592653589793, -3.1053981633974482, 2.841592653589793]}
        transition={{
          duration: 0.6,
        }}
      >
        <Avatar animation={characterAnimation} />
      </motion.group>
    </group>
  );
}

export default function App() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});

  let date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const [cdate, setDate] = useState(date);
  const UpdateDate = () => {
    date = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setDate(date);
  };
  setInterval(UpdateDate);

  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <web.main style={{ background: "f0f0f0" }}>
      <web.h1 className={"title"} style={{ opacity: 1 }}>
        Mirco Vianello
        <br />
        Software Engineer
      </web.h1>
      <web.h1 className={"clock-date"} style={{ opacity: 1 }}>
        {cdate}
      </web.h1>
      <web.h1 className={"clock-time"} style={{ opacity: 1 }}>
        {ctime}
      </web.h1>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 2, 6], fov: 50 }}>
        <three.pointLight
          position={[-1, -1, 2]}
          intensity={1.5}
          color={"#f0f0f0"}
        />
        <Suspense fallback={null}>
          <group>
            <Scene
              zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
            />
            <Controls zoom={zoom} focus={focus} />
          </group>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.4}
          scale={10}
          blur={1}
          far={1.55}
        />
      </Canvas>
    </web.main>
  );
}
