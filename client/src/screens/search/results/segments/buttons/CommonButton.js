import React from "react";

const CommonButton = props => {
  const className = "jobToggleButton " + props.className;

  return (
    <button
      className={className}
      onClick={event => {
        props.callback(event);
      }}
    >
      {props.label}
    </button>
  );
};

export default CommonButton;
