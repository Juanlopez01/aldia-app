import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/user.model";
import dbConnect from "../../../src-backend/db";

dbConnect();

export default async function verifyCompany(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email = req.query.email;
    if (typeof email === "string") {
      const emailTransformed = email.split("%40").join("@");

      const verification = await User.find({ email: emailTransformed });
      if (verification[0].company.length !== 0) {
        res.status(200).json({ msg: verification[0].company });
      } else {
        res.status(200).json({ msg: "Not found" });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
