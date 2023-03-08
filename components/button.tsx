import classNames from "classnames";
import React from "react";
import { FunctionComponent } from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button: FunctionComponent<ButtonProps> = ({ className, ...rest }) => {
  return (
    <button
      {...rest}
      className={classNames(
        "cursor-pointer h-[46px] rounded-[13px] px-5 shadow-[2px_3px_10px_rgba(95,106,245,0.5)] transition-all hover:shadow-[2px_3px_20px_rgba(95,106,245,0.5)] select-none from-[#854BF2] text-white to-[#4280F6] bg-gradient-to-tr",
        className
      )}
    ></button>
  );
};

export default Button;
