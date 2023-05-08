import Link from "next/link";
import Layout from "../components/Layout";
import { OpenAI } from "langchain/llms/openai";
import { useEffect, useState } from "react";
import { LLMChain, PromptTemplate } from "langchain";
import PdfUploader from "../components/PdfUploader";

const IndexPage = () => {
  const [count, setCount] = useState(0);
  const callModel = async () => {
    const model = new OpenAI({
      openAIApiKey: "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",
      temperature: 0.9,
    });
    const template = "What is a good name for a company that makes {product}?";
    const prompt = new PromptTemplate({
      template: template,
      inputVariables: ["product"],
    });
    const chain = new LLMChain({ llm: model, prompt: prompt });
    const res = await chain.call({ product: "colorful socks" });
    console.log(res);
  };
  const model = new OpenAI({
    openAIApiKey: "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",
    temperature: 0.9,
  });
  useEffect(() => {
    callModel();
  }, []);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <PdfUploader />
    </Layout>
  );
};

export default IndexPage;
