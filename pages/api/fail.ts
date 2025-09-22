// pages/api/fail.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(500).json({ message: "Simulated server error" });
}
