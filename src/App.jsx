import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { a as three } from "@react-spring/three";
import { a as web } from "@react-spring/web";
import { Controls } from "./components/Controls";
import { Desk } from "./components/Desk";
import { Newton } from "./components/Newton";
import { Laptop } from "./components/Laptop";
import { Avatar } from "./components/Avatar";
import { motion } from "framer-motion-3d";
import { Title } from "./components/Title";
import { Clock } from "./components/Clock";
import { Trail } from "./components/Trail";
import { Scene } from "./components/Scene";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});

  return (
    <ChakraProvider>
      <web.main>
        <div className={"container"}>
          <Trail open={!zoom}>
            <Title />
            <Clock />
          </Trail>
        </div>
        <Canvas dpr={[1, 2]} camera={{ position: [-1, 0, 0], fov: 50 }}>
          <three.pointLight
            position={[-1, -1, 2]}
            intensity={1.5}
            color={"#f0f0f0"}
          />
          <Suspense fallback={null}>
            <group>
              <Scene>
                <Desk position={[0, -3.26, -1]} />
                <Newton position={[-1.7, -1.6, -0.4]} />
                <Laptop
                  position={[0, -1.5, -0.7]}
                  castShadow
                  receiveShadow
                  zoomToView={(focusRef) => (
                    setZoom(!zoom), setFocus(focusRef)
                  )}
                />
                <motion.group
                  position={[1.3, -1.7, -0.6]}
                  rotation={[
                    1.611592653589793, -3.1053981633974482, 2.841592653589793,
                  ]}
                  transition={{
                    duration: 0.6,
                  }}
                >
                  <Avatar />
                </motion.group>
              </Scene>
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
    </ChakraProvider>
  );
}
