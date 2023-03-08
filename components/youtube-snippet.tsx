import { FunctionComponent, useEffect, useState } from "react";

interface YoutubeSnippetProps {
  url: string;
}

const YoutubeSnippet: FunctionComponent<YoutubeSnippetProps> = ({ url }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const getSnippet = async () => {
      try {
        const attribute = url.includes("user") ? "forUsername" : "id";
        const value = url.split("/").at(-1);
        const res = await fetch(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&${attribute}=${value}&key=AIzaSyAnWaA1mCb9v87GL254fnUbc0LO9EPUPuM`
        ).then((x) => x.json());
        setImage(res.items[0].snippet.thumbnails.medium.url);
      } catch (er) {
        console.log(er);
      }
    };

    getSnippet();
  }, [url]);

  return <div className="w-[80px] h-[80px] rounded-full bg-center bg-cover" style={{ backgroundImage: `url(${image})` }}></div>;
};

export default YoutubeSnippet;
