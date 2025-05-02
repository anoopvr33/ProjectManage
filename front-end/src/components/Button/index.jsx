import React from "react";

const Button = ({ classname, onClick, type }) => {
  return (
    <div>
      <button type={type} onClick={onClick} className={`${classname} btn`}>
        Button
      </button>
    </div>
  );
};

export default Button;
