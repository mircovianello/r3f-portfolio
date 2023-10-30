import React from "react";
import { a as web } from "@react-spring/web";

export function Title() {
  return (
    <>
      <web.h1 className={"title"} style={{ opacity: 1 }}>
        Mirco
        <br />
        Vianello
        <br />
      </web.h1>
      <web.h1 className={"subtitle"} style={{ opacity: 1 }}>
        <span style={{ fontSize: "0.4em" }}>Software Engineer</span>
      </web.h1>
    </>
  );
}
