import dbConnect from "../../../utils/dbConnect";
import Service from "../../../models/Service";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      if (req.query.user === "auth0|5f27b78668033f003d618d38") {
        try {
          const service = new Service(req.body);
          service.save().then(() => {
            res.send(service);
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
