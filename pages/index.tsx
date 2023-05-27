// import Layout from "../components/Layout";
// import { useEffect, useState } from "react";
// import { Message } from "../types/chat";
// import { Document } from "langchain/document";
import Chat from "../components/Chat";

const IndexPage = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const [messageState, setMessageState] = useState<{
  //   messages: Message[];
  //   pending?: string;
  //   history: [string, string][];
  //   pendingSourceDocs?: Document[];
  // }>({
  //   messages: [],
  //   history: [],
  // });
  // const callModel = async () => {
  //   const question = "What is this document about?";

  //   try {
  //     const response = await fetch("/api/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         question,
  //         history,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     setLoading(false);
  //     setError("An error occurred while fetching the data. Please try again.");
  //     console.log("error", error);
  //   }
  // };
  // useEffect(() => {
  //   callModel();
  // }, []);
  return <Chat />;
};

export default IndexPage;
