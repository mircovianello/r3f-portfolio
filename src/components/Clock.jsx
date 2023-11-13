import React, { useState } from "react";

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
    second: "2-digit",
  });

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <>
      <h1 className={"clock-date"}>{cdate}</h1>
      <h1 className={"clock-time"}>{ctime}</h1>
    </>
  );
}
