import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Button({classN, click, text}) {
  return (
    <button className={classN} onClick={click} role="button" tabIndex="0">
      {text}
    </button>
  );
}

export default Button;
