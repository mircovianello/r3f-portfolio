import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Newton(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/Newton.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Pendel.timeScale = 0.5;
    actions.Pendel.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null} scale={[0.5, 0.5, 0.5]}>
      <group name="Newton_Scene">
        <group name="Newton_model" rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Cube_0">
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.Pendel}
                />
              </group>
              <group
                name="Cylinder_1"
                position={[-0.377, 0.098, -0.379]}
                scale={[1.903, 1, 1.903]}
              >
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials.Pendel}
                />
              </group>
              <group name="Armature_17" position={[0, 1.011, 0]}>
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <group name="Cube002_7" />
                  <group name="Cube003_8" />
                  <group name="Cube004_9" />
                  <group name="Cube005_10" />
                  <group name="Cube006_11" />
                  <group name="Cylinder002_12" />
                  <group name="Icosphere002_13" />
                  <group name="Icosphere003_14" />
                  <group name="Icosphere004_15" />
                  <group name="Icosphere005_16" />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.Angelsehne}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.Angelsehne}
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={materials.Angelsehne}
                    skeleton={nodes.Object_15.skeleton}
                  />
                  <skinnedMesh
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={materials.Angelsehne}
                    skeleton={nodes.Object_17.skeleton}
                  />
                  <skinnedMesh
                    name="Object_19"
                    geometry={nodes.Object_19.geometry}
                    material={materials.Angelsehne}
                    skeleton={nodes.Object_19.skeleton}
                  />
                  <skinnedMesh
                    name="Object_21"
                    geometry={nodes.Object_21.geometry}
                    material={materials.Metall}
                    skeleton={nodes.Object_21.skeleton}
                  />
                  <skinnedMesh
                    name="Object_23"
                    geometry={nodes.Object_23.geometry}
                    material={materials.Metall}
                    skeleton={nodes.Object_23.skeleton}
                  />
                  <skinnedMesh
                    name="Object_25"
                    geometry={nodes.Object_25.geometry}
                    material={materials.Metall}
                    skeleton={nodes.Object_25.skeleton}
                  />
                  <skinnedMesh
                    name="Object_27"
                    geometry={nodes.Object_27.geometry}
                    material={materials.Metall}
                    skeleton={nodes.Object_27.skeleton}
                  />
                  <skinnedMesh
                    name="Object_29"
                    geometry={nodes.Object_29.geometry}
                    material={materials.Metall}
                    skeleton={nodes.Object_29.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
