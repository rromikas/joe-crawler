import { NextApiHandler } from "next";
import { CreativeUpdateResponse } from "types";
import { supabase } from "../create";

const handler: NextApiHandler<CreativeUpdateResponse> = async (req, res) => {
  const id = req.query.id as string;
  const { data } = await supabase
    .from("creatives")
    .update(req.body)
    .eq("id", +id)
    .select();
  res.json(data?.length ? data[0] : null);
};

export default handler;
