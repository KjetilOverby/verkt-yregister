import dbConnect from "../../../utils/dbConnect";
import Blades from "../../../models/Blades";

dbConnect();

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const blades = await Blades.aggregate([
          {
            $match: {
              updated: {
                $gte: new Date(`${currentYear}-${currentMonth}-01`),
                $lte: new Date(`${currentYear}-${currentMonth}-31`),
              },
            },
          },
       
        ]);

        res.status(200).json({ success: true, data: blades });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
