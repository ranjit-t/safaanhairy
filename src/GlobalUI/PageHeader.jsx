import React from "react";

export default function PageHeader(props) {
  const basicStyles =
    "font-bold text-3xl flex justify-center text-center mt-10";
  return <div className={`${basicStyles} ${props.css}`}>{props.children}</div>;
}
