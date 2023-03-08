import { FunctionComponent } from "react";

interface IosLoaderProps {}

const IosLoader: FunctionComponent<IosLoaderProps> = () => {
  return (
    <div className="w-14 h-14 flex items-center justify-center">
      <div className="loader">
        {new Array(8).fill(0).map((x, i) => (
          <div key={`loader-item-${i}`} className={`loader__item loader__item-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default IosLoader;
