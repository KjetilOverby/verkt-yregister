import dbConnect from "../../../utils/dbConnect";
import Waste from "../../../models/Waste";

dbConnect();

const currentYear = new Date().getFullYear();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const waste = await Waste.aggregate([
          {
            $match: {
              wasteDate: {
                $gte: new Date(`${currentYear}-01-01`),
                $lte: new Date(`${currentYear}-12-31`),
              },
            },
          },
          { $count: "countYear" },
        ]);

        res.status(200).json({ success: true, data: waste });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
