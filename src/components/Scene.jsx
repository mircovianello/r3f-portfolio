import React, { createContext, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";

export const SceneContext = createContext();

export function Scene({ ...props }) {
  const ref = useRef();

  const [open, setOpen] = useState(false);
  const [focused, setFocus] = useState(false);

  const textureBackground = useTexture("textures/Scene.jpg");

  return (
    <SceneContext.Provider value={{ open, setOpen, focused, setFocus }}>
      <mesh scale={[1, 3, 1]} position={[0, -1, -2]}>
        <planeGeometry args={[6, 2.3, 1, 1]} />
        <meshBasicMaterial attach="material" map={textureBackground} />
      </mesh>
      <group ref={ref}>{props.children}</group>
    </SceneContext.Provider>
  );
}
