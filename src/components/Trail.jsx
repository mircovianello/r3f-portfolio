import React from "react";
import { useTrail, a as web } from "@react-spring/web";

export function Trail({ open, children }) {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 1500 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 160 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <>
      {trail.map(({ height, ...style }, index) => (
        <web.div key={index} className={"trailsText"} style={style}>
          <web.div style={{ height }}>{items[index]}</web.div>
        </web.div>
      ))}
    </>
  );
}
