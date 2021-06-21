import dbConnect from "../../../utils/dbConnect";
import Blades from "../../../models/Blades";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const blades = await Blades.find({
          serial: { $regex: req.query.userquery },
        });

        res.status(200).json({ success: true, data: blades });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
