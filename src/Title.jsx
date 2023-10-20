import React from "react";
import { a as web } from "@react-spring/web";

export function Title() {
  return (
    <>
      <web.h1 className={"title"} style={{ opacity: 1 }}>
        Mirco Vianello
        <br />
        Software Engineer
      </web.h1>
    </>
  );
}
