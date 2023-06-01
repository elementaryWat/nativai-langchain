import Head from "next/head";
import LevelSelect from "../components/LevelSelect/LevelSelect";

const IndexPage = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LevelSelect />
    </>
  );
};

export default IndexPage;
