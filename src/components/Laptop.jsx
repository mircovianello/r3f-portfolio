import React, { useContext, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSpring } from "@react-spring/core";
import { Html, useGLTF, useVideoTexture } from "@react-three/drei";
import { a as three } from "@react-spring/three";
import { SceneContext } from "./Scene";
import { Website } from "./Website";

export function Laptop({ zoomToView, c = new THREE.Color(), ...props }) {
  const group = useRef();
  const { open, setOpen, focused, setFocus } = useContext(SceneContext);

  const { nodes, materials } = useGLTF("models/Laptop.glb");

  const spring = useSpring({ open: Number(open) });
  const handleOpen = () => {
    setOpen((value) => !value);
  };

  const handleFocus = () => {
    setFocus((value) => !value);
  };

  const [hovered, setHovered] = useState(false);
  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );

  const textureVSCode = useVideoTexture("textures/vscode.mp4");

  return (
    <group
      scale={[0.2, 0.2, 0.2]}
      ref={group}
      onClick={(e) => (e.stopPropagation(), handleOpen())}
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
                handleFocus()
              )}
            >
              <meshBasicMaterial attach="material" map={textureVSCode} />
            </mesh>
          )}
          {focused && (
            <mesh
              material={materials["screen.001"]}
              geometry={nodes["Cube008_2"].geometry}
              onPointerMissed={(e) => (
                e.stopPropagation(), zoomToView(e.position), handleFocus()
              )}
            >
              <Html
                rotation-x={-Math.PI / 2}
                position={[0, 0.05, -0.09]}
                transform
                distanceFactor={1.8}
                occlude
              >
                <div onPointerDown={(e) => e.stopPropagation()}>
                  <Website />
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
