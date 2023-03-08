import classNames from "classnames";
import React from "react";
import { FunctionComponent } from "react";

interface PickableProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  picked: boolean;
  pick: () => void;
}

const Pickable: FunctionComponent<PickableProps> = ({ picked, pick, className, children, ...rest }) => {
  return (
    <div
      onMouseDown={pick}
      className={classNames(className, "cursor-pointer rounded-lg select-none overflow-hidden relative", {
        "shadow-[0px_0px_0px_4px_#6861F4]": picked,
        "hover:shadow-[0px_0px_0px_3px_rgba(104,97,244,1)]": !picked,
      })}
      {...rest}
    >
      {children}
      {picked && (
        <div className="absolute left-0 top-0 w-full h-full bg-[#6861F4]/10">
          <div className="absolute top-1 right-1 flex items-center justify-center">
            <div className="absolute w-4 h-4 bg-white rounded-full"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6861F4" className="w-6 h-6 relative">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pickable;
