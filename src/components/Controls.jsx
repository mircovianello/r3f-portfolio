import { useMemo } from "react";
import * as THREE from "three";
import CameraControls from "camera-controls";
import { useFrame, useThree } from "@react-three/fiber";

CameraControls.install({ THREE });

export function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
  return useFrame((state, delta) => {
    zoom
      ? pos.set(focus.x + 0.3, focus.y - 0.9, focus.z + 0.7)
      : pos.set(0, 0, 6);
    zoom
      ? look.set(focus.x + 0.3, focus.y - 0.9, focus.z - 0.7)
      : look.set(1, 0, 3);

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
