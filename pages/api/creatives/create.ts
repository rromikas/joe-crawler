import { NextApiHandler } from "next";
import { createClient } from "@supabase/supabase-js";
import { CreativeCreateResponse } from "types";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const handler: NextApiHandler<CreativeCreateResponse> = async (req, res) => {
  const { data } = await supabase.from("creatives").insert(req.body).select();
  res.json(data?.length ? data[0] : null);
};

export default handler;
