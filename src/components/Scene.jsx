import React, { createContext, useRef, useState } from "react";

export const SceneContext = createContext();

export function Scene({ ...props }) {
  const ref = useRef();

  const [open, setOpen] = useState(false);
  const [focused, setFocus] = useState(false);

  return (
    <SceneContext.Provider value={{ open, setOpen, focused, setFocus }}>
      <group ref={ref}>{props.children}</group>
    </SceneContext.Provider>
  );
}
