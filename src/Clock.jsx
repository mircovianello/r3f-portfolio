import React, { useState } from "react";
import { a as web } from "@react-spring/web";

export function Clock() {
  let date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const [cdate, setDate] = useState(date);
  const UpdateDate = () => {
    date = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setDate(date);
  };
  setInterval(UpdateDate);

  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <>
      <web.h1 className={"clock-date"} style={{ opacity: 1 }}>
        {cdate}
      </web.h1>
      <web.h1 className={"clock-time"} style={{ opacity: 1 }}>
        {ctime}
      </web.h1>
    </>
  );
}
