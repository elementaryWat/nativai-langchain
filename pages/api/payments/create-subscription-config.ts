import mercadopage from "mercadopago";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  mercadopage.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });
  const { payer_email } = req.body;

  if (!payer_email) {
    return res
      .status(400)
      .json({ message: "Payer Email parameter is missing" });
  }

  try {
    const result = await mercadopage.preapproval.create({
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 999,
        currency_id: "ARS",
      },
      external_reference: "Premium",
      reason: "Premium plan",
      payer_email,
      back_url: process.env.MERCADOPAGO_BACK_URL,
      notification_url: process.env.MERCADOPAGO_NOTIFICATION_URL,
    });
    res.json(result.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
