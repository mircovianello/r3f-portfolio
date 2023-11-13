import React, { useContext, useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useStore } from "../store";
import { SceneContext } from "./Scene";
import * as THREE from "three";

export function Avatar(props) {
  const { open, focused } = useContext(SceneContext);

  const { idle, play, playNext, actionName, prevActionName } = useStore(
    (state) => state
  );

  const group = useRef();
  const { nodes, materials } = useGLTF("models/Avatar.glb");

  const { animations: idleAnimation } = useFBX("animations/Idle.fbx");
  const { animations: wavingAnimation } = useFBX("animations/Waving.fbx");
  const { animations: surprisedAnimation } = useFBX("animations/Surprised.fbx");
  const { animations: sittingDownAnimation } = useFBX(
    "animations/Sitting Down.fbx"
  );
  const { animations: standingUpAnimation } = useFBX(
    "animations/Standing Up.fbx"
  );
  const { animations: armGestureAnimation } = useFBX(
    "animations/Arm Gesture.fbx"
  );
  const { animations: clappingAnimation } = useFBX("animations/Clapping.fbx");

  idleAnimation[0].name = "Idle";
  wavingAnimation[0].name = "Waving";
  surprisedAnimation[0].name = "Surprised";
  sittingDownAnimation[0].name = "Sitting Down";
  sittingDownAnimation[0].duration = 0;
  standingUpAnimation[0].name = "Standing Up";
  armGestureAnimation[0].name = "Arm Gesture";
  clappingAnimation[0].name = "Clapping";

  const { mixer, actions } = useAnimations(
    [
      idleAnimation[0],
      wavingAnimation[0],
      surprisedAnimation[0],
      sittingDownAnimation[0],
      standingUpAnimation[0],
      armGestureAnimation[0],
      clappingAnimation[0],
    ],
    group
  );

  useEffect(() => {
    if (prevActionName !== undefined) {
      actions[prevActionName].fadeOut(0.5);
    }
    actions[actionName]
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.5)
      .play();

    if (
      actionName == "Surprised" ||
      actionName == "Arm Gesture" ||
      actionName == "Clapping" ||
      actionName == "Standing Up"
    ) {
      actions[actionName].setLoop(THREE.LoopOnce);
      actions[actionName].clampWhenFinished = true;
    }

    mixer.removeEventListener("finished", idle);

    if (
      actionName != "Idle" &&
      actionName != "Sitting Down" &&
      actionName != "Waving"
    ) {
      actions[actionName].getMixer().addEventListener("finished", idle);
    }
  }, [actionName]);

  useEffect(() => {
    const interval = setInterval(() => playNext(), 60000);
    return () => clearInterval(interval);
  }, [playNext]);

  useEffect(() => {
    if (open && !focused) {
      prevActionName === "Sitting Down" ? play(2) : idle();
    } else if (open && focused) {
      prevActionName !== "Arm Gesture" ? play(4) : idle();
    } else if (!open) {
      prevActionName === undefined ? play(1) : play(3);
    }
  }, [open, focused]);

  return (
    <group {...props} ref={group} scale={[0.5, 0.5, 0.5]} dispose={null}>
      <group>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Beard"
          geometry={nodes.Wolf3D_Beard.geometry}
          material={materials.Wolf3D_Beard}
          skeleton={nodes.Wolf3D_Beard.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/Avatar.glb");
