import { NextApiHandler } from "next";

export type URL2HTMLResponse = {
  html: string;
} | null;

const handler: NextApiHandler<URL2HTMLResponse> = async (req, res) => {
  try {
    const url = req.query.url as string;
    const html = await fetch(url).then((x) => x.text());
    res.json({ html });
  } catch (error) {
    console.log({ error });
    res.json(null);
  }
};

export default handler;
