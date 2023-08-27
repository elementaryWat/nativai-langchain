import mercadopago from "mercadopago";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });
  const { subscriptionId } = req.body;

  if (!subscriptionId) {
    return res
      .status(400)
      .json({ message: "Subscription Id parameter is missing" });
  }

  try {
    const result = await mercadopago.preapproval.cancel(subscriptionId);
    res.status(200).json(result.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
