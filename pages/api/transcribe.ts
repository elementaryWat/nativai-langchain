// pages/api/transcribe.js
import { Configuration, OpenAIApi } from "openai";
import multer from "multer";
import fs from "fs";
import tmp from "tmp";
import { franc } from "franc-min";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Multer config
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false, // Disabling Next.js's body parser to use multer's
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    upload.single("audio")(req, res, async (err) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong", err });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: "No audio file received." });
        return;
      }

      try {
        const tmpFile = tmp.fileSync({
          prefix: req.file.originalname,
          postfix: ".mp3",
        });
        // Write buffer data to the temporary file
        fs.writeFileSync(tmpFile.name, req.file.buffer);

        const resp = await openai.createTranscription(
          fs.createReadStream(tmpFile.name) as any,
          "whisper-1",
          "audio in english",
          "json",
          0.2,
          "en"
        );
        const language = franc(resp.data.text);
        res.status(200).json({ transcription: resp.data.text, language });

        // Clean up the temporary file
        tmpFile.removeCallback();
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Error processing the audio file", error });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
