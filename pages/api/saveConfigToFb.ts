import db from "../../utils/firebaseClient";

export default async (req, res) => {
  try {
    const { config } = req.body;
    const chatConfigRef = db.collection("chatConfig").doc();
  } catch (e) {
    res.status(400).end();
  }
};
