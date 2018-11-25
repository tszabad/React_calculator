import React from "react";
import "../styles.css";
const DeleteKey = props => {
  return (
    <button
      onClick={props.onKeyPressed}
      value={props.value}
      className={"calc butt butt2"}
      {...props}
    >
      {props.value}{" "}
    </button>
  );
};
export default DeleteKey;
