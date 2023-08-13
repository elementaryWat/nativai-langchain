import { NextApiRequest, NextApiResponse } from "next";
import mercadopage from "mercadopago";

const receiveWebhookHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  mercadopage.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });

  try {
    const payment = req.query;
    console.log(payment);

    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(
        payment["data.id"] as string
      );
      console.log(data);
    }

    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export default receiveWebhookHandler;
