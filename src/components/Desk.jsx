import React from "react";
import { useGLTF } from "@react-three/drei";

export function Desk(props) {
  const { nodes, materials } = useGLTF("models/Desk.glb");
  return (
    <group {...props} dispose={null} scale={[0.04, 0.04, 0.04]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.Material}
            position={[0, 0.248, 7.35]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}
