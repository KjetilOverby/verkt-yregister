import dbConnect from "../../../utils/dbConnect";
import Blades from "../../../models/Blades";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":

      if (req.query.user === "auth0|5f27b78668033f003d618d38") {
        try {
            const blade = await Blades.findByIdAndUpdate(
                { _id: req.query.ids },
              {
                $push: { performer: req.body.performer, date: req.body.date },
              },
              {
                new: true,
                runValidators: true,
              }
            );
        
            if (!blade) return res.status(404).send();
            res.send(blade);
          } catch (error) {
            res.status(400).send(error);
          }
      } else {
        res.send("Uautorisert forespørsel");
      }
      break;
  }
};