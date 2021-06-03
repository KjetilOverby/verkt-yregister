import dbConnect from "../../../utils/dbConnect";
import Waste from "../../../models/Waste";

dbConnect();

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const waste = await Waste.aggregate([
          {
            $match: {
              wasteDate: {
                $gte: new Date(`${currentYear}-${currentMonth}-01`),
                $lte: new Date(`${currentYear}-${currentMonth}-31`),
              },
            },
          },
          { $count: "countMonth" },
        ]);

        res.status(200).json({ success: true, data: waste });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
