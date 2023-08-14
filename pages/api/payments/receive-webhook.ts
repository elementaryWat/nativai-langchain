import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });

  try {
    const transaction = req.query;
    console.log(transaction);

    if (req.body.type === "test") {
      return res.status(200).send("Valid test.");
    }

    if (transaction.type === "subscription_preapproval") {
      const preapproval_data = await mercadopago.preapproval.findById(
        transaction["data.id"] as string
      );

      // Forward the payment details to Google Cloud Function endpointå
      await fetch("https://receivewebhookevent-t6ijlufl2a-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionType: transaction.type,
          subscriptionId: preapproval_data.body.id,
          subscriptionStatus: preapproval_data.body.status,
          expirationDate: preapproval_data.body?.auto_recurring?.end_date,
        }),
      });
    } else if (transaction.type === "subscription_authorized_payment") {
      console.log(transaction["data.id"]);
      const payment_data = await mercadopago.payment.findById(
        transaction["data.id"] as string
      );
      console.log(payment_data);
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
