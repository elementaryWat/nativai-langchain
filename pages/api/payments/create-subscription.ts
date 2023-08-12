import mercadopage from "mercadopago";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  mercadopage.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });

  try {
    const result = await mercadopage.preapproval.create({
      id: process.env.MERCADOPAGO_ID,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 999,
        currency_id: "ARS",
      },
      external_reference: "Premium",
      reason: "Premium plan",
      payer_email: "test_user_1425278301@testuser.com",
      back_url: process.env.MERCADOPAGO_BACK_URL,
      notification_url: process.env.MERCADOPAGO_NOTIFICATION_URL,
    });

    console.log(result);
    res.json(result.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
