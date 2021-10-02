import dbConnect from "../../../utils/dbConnect";
import Service from "../../../models/Service";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      if (req.query.user === process.env.USER_SUB) {
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
