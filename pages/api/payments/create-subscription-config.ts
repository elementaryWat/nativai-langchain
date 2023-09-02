import mercadopago from "mercadopago";
import { NextApiRequest, NextApiResponse } from "next";

const fetchDollarRate = async () => {
  try {
    const response = await fetch("https://api.bluelytics.com.ar/v2/latest");
    const data = await response.json();
    return data.blue.value_sell;
  } catch (error) {
    return 750; //hardcoded value for dollar rate
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });
  const { payer_email } = req.body;

  if (!payer_email) {
    return res
      .status(400)
      .json({ message: "Payer Email parameter is missing" });
  }
  console.log(payer_email);
  const dollarRate = await fetchDollarRate();
  const transactionAmountUSD = 0.99;
  const transactionAmountARS = transactionAmountUSD * dollarRate;

  try {
    const result = await mercadopago.preapproval.create({
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: transactionAmountARS,
        currency_id: "ARS",
      },
      external_reference: "Premium",
      reason: "NativAI Premium plan",
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
