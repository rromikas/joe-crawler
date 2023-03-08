import Input from "components/input";
import Image from "next/image";
import classNames from "classnames";
import FrescImage from "assets/Fresc.png";
import { useState } from "react";
import { poppinsFont } from "fonts/poppins";
import { abrilFont } from "fonts/abril";
import ContinueButton from "components/continue-button";
import { useRouter } from "next/router";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const onSubmit = async () => {
    if (url.length) {
      router.push(`/content?url=${url}`);
    }
  };

  return (
    <div className={classNames("fixed left-0 top-0 w-full h-full flex", poppinsFont.className)}>
      <div className="flex-grow md:p-16 sm:p-12 p-9 flex flex-col justify-between h-full overflow-auto">
        <Image
          className="cursor-pointer"
          src="https://uploads-ssl.webflow.com/60e7136dbe6f52e2e6823343/61910c6578c8b35943d2942c_Logo%20SP%20(1).png"
          alt="Logo"
          width={173}
          height={20}
        />

        <div className="my-12">
          <div className={classNames("text-[32px] mb-4", abrilFont.className)}>What is your brand name?</div>
          <div className="text-lg mb-8" style={{ maxWidth: 472 }}>
            Hey, my name is Sofia, I’m here to help you create amazing creative flow in few clicks.
          </div>
          <div className="relative sm:pr-12 max-w-[506px] mb-7">
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSubmit();
                }
              }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website address"
              className="w-full"
            ></Input>
            <div className="sm:absolute sm:mt-0 mt-4 right-0 top-0 h-full flex items-center">
              <ContinueButton onClick={onSubmit}></ContinueButton>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 items-center">
          {new Array(3).fill(0).map((x, i) => (
            <div
              key={`step-indicator-${i}`}
              className={classNames("rounded-full", {
                "w-[10px] h-[10px] border border-black bg-white": 0 === i,
                "w-[6px] h-[6px] bg-black": 0 < i,
              })}
            ></div>
          ))}
        </div>
      </div>
      <div className={classNames("hidden w-2/5 lg:block flex-shrink-0 sticky top-0 overflow-hidden bg-[#814DF2]")}>
        <Image fill src={FrescImage} alt="" className="object-cover"></Image>
      </div>
    </div>
  );
}
