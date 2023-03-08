import classNames from "classnames";
import { poppinsFont } from "fonts/poppins";
import { useRouter } from "next/router";
import { URL2HTMLResponse } from "pages/api/url2html";
import { FunctionComponent, useEffect, useState } from "react";
import { Creative, CreativeCreateResponse, WebsiteData } from "types";
import Image from "next/image";
import Loader from "components/loader";
import FrescImage from "assets/Fresc.png";
import { abrilFont } from "fonts/abril";
import ContinueButton from "components/continue-button";
import PillarImage from "assets/Pillar.png";
import Pickable from "components/pickable";
import YoutubeSnippet from "components/youtube-snippet";
import Preview from "components/preview";
import TemplateData from "templates/template1";
import toast from "react-hot-toast";

interface ContentPageProps {}

const ContentPage: FunctionComponent<ContentPageProps> = () => {
  const [html, setHtml] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [websiteData, setWebsiteData] = useState<WebsiteData>();
  const { query, isReady, push } = useRouter();
  const url = query.url as string;
  const preview = query.preview;
  const [pickedData, setPickedData] = useState<Omit<WebsiteData, "url">>({
    colors: [],
    images: [],
    youtubeLinks: [],
    instagramLinks: [],
    logos: [],
  });
  const templateData = TemplateData({ ...pickedData, url });

  useEffect(() => {
    const getHtml = async () => {
      setHtml("");
      setLoading(true);
      const res = (await fetch(`/api/url2html?url=${url}`).then((x) => x.json())) as URL2HTMLResponse;
      if (res) {
        setHtml(res.html);
      } else {
        toast.error("Incorrect website url.");
        push(`/`);
      }
    };
    if (isReady && url) {
      getHtml();
    }
  }, [isReady, url]);

  const Pick = <T extends keyof Omit<WebsiteData, "url">>(key: T, value: string) => {
    setPickedData((prev) => {
      let arr = [...prev[key]];
      const index = arr.findIndex((a) => a === value);
      if (index === -1) {
        arr.push(value);
      } else {
        arr.splice(index, 1);
      }
      return { ...prev, [key]: arr };
    });
  };

  const creative: Omit<Creative, "id"> = {
    campaign_id: 52,
    format: templateData.presentation.format.width + "x" + templateData.presentation.format.height,
    name: "",
    template_id: 2,
    config: { templateComponent: "drag-and-drop", dndConfig: templateData },
  };

  return preview ? (
    <Preview websiteData={{ ...pickedData, url }}></Preview>
  ) : (
    <div className={classNames("fixed left-0 top-0 w-full h-full overflow-auto", poppinsFont.className)}>
      {!html ? null : (
        <div className="absolute left-0 top-0 w-0 overflow-hidden h-0 -z-10 bg-white ">
          <iframe
            style={{ width: 1500, height: 1000 }}
            sandbox="allow-same-origin allow-forms"
            onLoad={(e) => {
              const doc = e.currentTarget.contentWindow?.document;
              if (!doc) return;
              let images: string[] = [];
              let logos: string[] = [];
              const imgEls = doc.querySelectorAll("img");
              imgEls.forEach((x) => {
                const src = x.src.startsWith(window.location.origin)
                  ? x.src.replace(window.location.origin, new URL(url).origin)
                  : x.src;
                const dataSrc = x.dataset["src"]?.startsWith("/") ? new URL(url).origin + x.dataset["src"] : x.dataset["src"];

                if (dataSrc) {
                  images.push(dataSrc);
                } else if (x.outerHTML.includes("logo") && !logos.includes(src)) {
                  logos.push(src);
                } else if (x.naturalWidth > 100 && x.naturalHeight > 100 && !images.includes(src) && !logos.includes(src)) {
                  images.push(src);
                }
              });

              let instagramLinks: string[] = [];

              doc.querySelectorAll("a").forEach((x) => {
                if (x.outerHTML.toLowerCase().includes("instagram") && !instagramLinks.includes(x.href)) {
                  instagramLinks.push(x.href);
                }
              });

              let youtubeLinks: string[] = [];

              doc.querySelectorAll("a").forEach((x) => {
                if (
                  x.outerHTML.toLowerCase().includes("youtube") &&
                  (x.href.includes("channel") || x.href.includes("user")) &&
                  !youtubeLinks.includes(x.href)
                ) {
                  youtubeLinks.push(x.href);
                }
              });

              let colors: string[] = [];
              doc.body.querySelectorAll("*").forEach((x) => {
                const el = x as HTMLElement;
                const computed = getComputedStyle(el);
                let color = computed.color || computed.backgroundColor;
                if (color?.length && !colors.includes(color)) {
                  colors.push(color);
                }
              });

              setWebsiteData({ logos, images, instagramLinks, youtubeLinks, colors, url });
              setLoading(false);
            }}
            srcDoc={html}
          ></iframe>
        </div>
      )}
      {loading ? (
        <div className="w-full h-full bg-[#814DF2] relative">
          <Image fill src={FrescImage} alt="" className="object-cover"></Image>
          <div className="absolute left-0 top-0 z-10 w-full h-full bg-[#814DF2]/50 backdrop-blur-md flex justify-center items-center">
            <div className="flex items-center">
              <Loader></Loader>
              <div style={{ fontSize: 42 }} className={classNames(abrilFont.className, "text-white ml-3")}>
                Loading...
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="flex-grow md:p-16 sm:p-12 p-9 flex flex-col justify-between">
            <Image
              className="cursor-pointer"
              onClick={() => push("/")}
              src="https://uploads-ssl.webflow.com/60e7136dbe6f52e2e6823343/61910c6578c8b35943d2942c_Logo%20SP%20(1).png"
              alt="Logo"
              width={173}
              height={20}
            />

            <div className="my-12">
              <div className={classNames("text-[32px] mb-4", abrilFont.className)}>Pick content you like</div>
              <div className="text-lg mb-8" style={{ maxWidth: 472 }}>
                Here what I found about your brand.
              </div>
              {!websiteData?.logos.length ? null : (
                <div className="mb-7">
                  <div className="mb-4">Logos</div>
                  <div className="flex flex-wrap">
                    {websiteData?.logos.map((x, i) => (
                      <Pickable
                        pick={() => {
                          Pick("logos", x);
                        }}
                        picked={pickedData.logos.includes(x)}
                        key={`logo-${i}`}
                        className="bg-zinc-200 mr-4 mb-4"
                      >
                        <img src={x} alt="" style={{ height: 80 }}></img>
                      </Pickable>
                    ))}
                  </div>
                </div>
              )}
              {!websiteData?.images.length ? null : (
                <div className="mb-7">
                  <div className="mb-4">Images</div>
                  <div className="flex flex-wrap">
                    {websiteData?.images.map((x, i) => (
                      <Pickable
                        pick={() => {
                          Pick("images", x);
                        }}
                        picked={pickedData.images.includes(x)}
                        key={`image-${i}`}
                        className="bg-zinc-200 mr-4 mb-4"
                      >
                        <img src={x} alt="" style={{ height: 80 }}></img>
                      </Pickable>
                    ))}
                  </div>
                </div>
              )}
              {!websiteData?.colors.length ? null : (
                <div className="mb-7">
                  <div className="mb-4">Colors</div>
                  <div className="flex flex-wrap">
                    {websiteData?.colors.map((x, i) => (
                      <Pickable
                        pick={() => {
                          Pick("colors", x);
                        }}
                        picked={pickedData.colors.includes(x)}
                        key={`color-${i}`}
                        className="mr-4 mb-4"
                      >
                        <div className="w-[80px] h-[80px] rounded-lg border" style={{ backgroundColor: x }}></div>
                      </Pickable>
                    ))}
                  </div>
                </div>
              )}
              {!websiteData?.youtubeLinks.length ? null : (
                <div className="mb-7">
                  <div className="mb-4">Youtube</div>
                  <div className="flex flex-wrap">
                    {websiteData?.youtubeLinks.map((x, i) => (
                      <Pickable
                        className="mr-4 mb-4"
                        key={`youtube-link-${i}`}
                        pick={() => Pick("youtubeLinks", x)}
                        picked={pickedData.youtubeLinks.includes(x)}
                      >
                        <YoutubeSnippet url={x}></YoutubeSnippet>
                      </Pickable>
                    ))}
                  </div>
                </div>
              )}
              {!websiteData?.instagramLinks.length ? null : (
                <div className="mb-7">
                  <div className="mb-4">Instagram</div>
                  <div className="flex flex-wrap">
                    {websiteData?.instagramLinks.map((x, i) => (
                      <Pickable
                        key={`instagram-link-${i}`}
                        pick={() => Pick("instagramLinks", x)}
                        picked={pickedData.instagramLinks.includes(x)}
                        className="mb-4 mr-4"
                      >
                        <div className="px-7 rounded-xl bg-zinc-100 py-2">{x}</div>
                      </Pickable>
                    ))}
                  </div>
                </div>
              )}
              <ContinueButton
                onClick={async () => {
                  setLoading(true);
                  const res: CreativeCreateResponse = await fetch(`/api/creatives/create`, {
                    method: "POST",
                    body: JSON.stringify(creative),
                    headers: { "Content-Type": "application/json" },
                  }).then((x) => x.json());
                  if (res) {
                    window.open(`https://sofia-cms-sql.netlify.app/preview/${res.id}`);
                  }

                  setLoading(false);
                }}
              ></ContinueButton>
            </div>

            <div className="flex space-x-4 items-center">
              {new Array(3).fill(0).map((x, i) => (
                <div
                  key={`step-indicator-${i}`}
                  className={classNames("rounded-full", {
                    "w-[10px] h-[10px]": 1 >= i,
                    "border border-black bg-white": 1 === i,
                    "from-[#854BF2] text-white to-[#4280F6] bg-gradient-to-tr": 1 > i,
                    "w-[6px] h-[6px] bg-black": 1 < i,
                  })}
                ></div>
              ))}
            </div>
          </div>
          <div className={classNames("hidden w-2/5 h-screen lg:block flex-shrink-0 sticky top-0 overflow-hidden bg-[#814DF2]")}>
            <Image fill src={PillarImage} alt="" className="object-cover"></Image>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
