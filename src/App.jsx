import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  Html,
  useGLTF,
  SpotLight,
  useDepthBuffer,
  ContactShadows,
} from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a as three } from "@react-spring/three";
import { a as web } from "@react-spring/web";
import HeroPage from "./HeroPage";
import CameraControls from "camera-controls";
import LockScreen from "/public/LockScreen.png";

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
    zoom ? pos.set(focus.x, focus.y, focus.z + 3.6) : pos.set(0, 0, 6);
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4);

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

function Laptop({ zoomToView, c = new THREE.Color(), ...props }) {
  const group = useRef();

  const { nodes, materials } = useGLTF("/mac-draco.glb");

  const [hovered, setHovered] = useState(false);
  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  const [open, setOpen] = useState(false);
  const spring = useSpring({ open: Number(open) });

  const [focused, setFocus] = useState(false);
  const toggleFocus = () => {
    setFocus((value) => !value);
  };

  const texture = useLoader(THREE.TextureLoader, LockScreen);

  return (
    <group
      scale={[0.2, 0.2, 0.2]}
      ref={group}
      onClick={(e) => (e.stopPropagation(), setOpen(!open))}
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
                toggleFocus()
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
                e.stopPropagation(), zoomToView(e.position), toggleFocus()
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

function MovingSpot({ vec = new THREE.Vector3(), ...props }) {
  return (
    <SpotLight
      castShadow
      penumbra={1}
      distance={6}
      angle={0.25}
      attenuation={6}
      anglePower={4}
      intensity={15}
      {...props}
    />
  );
}

function Scene({ zoomToView }) {
  const ref = useRef();

  const depthBuffer = useDepthBuffer({ frames: 1 });

  return (
    <group ref={ref}>
      <MovingSpot
        depthBuffer={depthBuffer}
        color="#e6e6e6"
        position={[0, 3, 0]}
      />
      <Laptop
        position={[0, -1.3, -0.7]}
        castShadow
        receiveShadow
        zoomToView={zoomToView}
      />
    </group>
  );
}

export default function App() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});

  return (
    <web.main style={{ background: "f0f0f0" }}>
      <web.h1
        style={{
          opacity: 1,
          transform: "translate3d(-50%,${o * 50 - 100}px,0)",
        }}
        className="title"
      >
        Mirco Vianello
        <br />
        Software Engineer
      </web.h1>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2, 6], fov: 50, near: 1, far: 20 }}
      >
        <fog attach="fog" args={["#202020", 5, 20]} />
        <ambientLight intensity={0.015} />
        <Suspense fallback={null}>
          <group onClick={(e) => (e.stopPropagation(), setOpen(!open))}>
            <Scene
              zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
            />
            <Controls zoom={zoom} focus={focus} />
          </group>
        </Suspense>
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={1.2}
          scale={20}
          blur={1.75}
          far={4.5}
        />
      </Canvas>
    </web.main>
  );
}
