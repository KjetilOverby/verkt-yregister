import dbConnect from "../../../utils/dbConnect";
import Blades from "../../../models/Blades";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      if (req.query.user === "auth0|5f27b78668033f003d618d38") {
        try {
          const blades = new Blades(req.body);
          blades.save().then(() => {
            res.send(blades);
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
