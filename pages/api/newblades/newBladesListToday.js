import dbConnect from "../../../utils/dbConnect";
import NewBlades from "../../../models/NewBlades";

dbConnect();

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const newblades = await NewBlades.aggregate([
          {
            $match: {
              updated: {
                $gte: new Date(`${currentYear}-${currentMonth}-01`),
                $lte: new Date(`${currentYear}-${currentMonth}-31`),
              },
            },
          },
        ]);

        res.status(200).json({ success: true, data: newblades });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
};
