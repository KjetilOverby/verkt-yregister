import dbConnect from "../../../utils/dbConnect";
import NewBlades from "../../../models/NewBlades";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "DELETE":
      if (req.query.user === "auth0|5f27b78668033f003d618d38") {
        try {
          const newblade = await NewBlades.deleteOne({ newid: req.query.del });
          if (!newblade) return res.status(404).send();
          res.send(newblade);

          // res.status(200).json({ success: true, data: blade });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      } else {
        res.send("Uautorisert forespørsel");
      }
      break;
  }
};
