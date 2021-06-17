import dbConnect from "../../../utils/dbConnect";
import Service from "../../../models/Service";

dbConnect();

const currentYear = new Date().getFullYear();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const service = await Service.aggregate([
          {
            $match: {
              serviceDate: {
                $gte: new Date(`${currentYear}-01-01`),
                $lte: new Date(`${currentYear}-12-31`),
              },
            },
          },
          {
            $group: {
              _id: {
                type: "$type",
              },
              typeCount: { $sum: 1 },
            },
          },
        ]).sort({ typeCount: -1 });

        res.status(200).json({ success: true, data: service });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
