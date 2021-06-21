import dbConnect from "../../../utils/dbConnect";
import NewBlades from "../../../models/NewBlades";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      if (req.query.user === "auth0|5f27b78668033f003d618d38") {
        try {
          const newblades = new NewBlades(req.body);
          newblades.save().then(() => {
            res.send(newblades);
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
