import React from "react";
import "../styles.css";
const Key = props => {
  return (
    <button
      onClick={props.onKeyPressed}
      value={props.value}
      className={"butt"}
      {...props}
    >
      {props.value}{" "}
    </button>
  );
};
export default Key;
