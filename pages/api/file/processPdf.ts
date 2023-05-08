import type { NextApiRequest, NextApiResponse } from "next";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { initPinecone } from "../../../utils/pinecone-client";
import {
  PINECONE_INDEX_NAME,
  PINECONE_NAME_SPACE,
} from "../../../config/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

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
      const rawDocs = await loader.load();

      //Split the documents
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 400,
        chunkOverlap: 50,
        separators: ["\n\n", "\n", " ", ""],
      });

      const docs = await splitter.splitDocuments(rawDocs);
      console.log("split docs", docs);
      console.log("creating vector store...");

      /*create and store the embeddings in the vectorStore*/
      const embeddings = new OpenAIEmbeddings();
      const pinecone = await initPinecone();
      console.log(PINECONE_INDEX_NAME);
      const index = pinecone.Index(PINECONE_INDEX_NAME);
      await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex: index,
        namespace: PINECONE_NAME_SPACE,
        textKey: "text",
      });
      res.status(200).json({ documents: docs });
    } catch (error) {
      res.status(500).json({ message: "Error processing PDF" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
