import classNames from "classnames";
import React from "react";
import { FunctionComponent } from "react";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Input: FunctionComponent<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      spellCheck={false}
      className={classNames(
        className,
        "h-[58px] text-[15px] rounded-[20px] px-7 focus:bg-white bg-[#F9F8F9] outline-none shadow-[0px_0px_0px_1px_#D8D8D8] placeholder:text-[#757575]"
      )}
      {...rest}
    ></input>
  );
};

export default Input;
