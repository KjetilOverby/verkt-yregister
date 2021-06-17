import dbConnect from "../../../utils/dbConnect";
import Waste from "../../../models/Waste";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      if (req.query.user === "auth0|5f27b78668033f003d618d38") {
        try {
          const waste = new Waste(req.body);
          waste.save().then(() => {
            res.send(waste);
          });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      } else {
        res.send("Uautorisert forespørsel");
      }
      break;
  }
};
