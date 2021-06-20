import dbConnect from "../../../utils/dbConnect";
import Blades from "../../../models/Blades";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "DELETE":
      if (req.query.user === "auth0|5f27b78668033f003d618d38") {
        try {
          const blade = await Blades.deleteOne({ newid: req.query.del });
          if (!blade) return res.status(404).send();
          res.send(blade);

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
