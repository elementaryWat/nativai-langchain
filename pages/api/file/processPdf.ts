import type { NextApiRequest, NextApiResponse } from "next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { promises as fs } from "fs";
import { IncomingForm } from "formidable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log(req);
      const fileBuffer = Buffer.from(req.body, "base64");
      const fileBlob = new Blob([fileBuffer], { type: "application/pdf" });

      const loader = new PDFLoader(fileBlob, {
        splitPages: false,
      });
      const docs = await loader.load();

      res.status(200).json({ documents: docs });
    } catch (error) {
      res.status(500).json({ message: "Error processing PDF" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
