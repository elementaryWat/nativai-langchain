import aws from "aws-sdk";

export const synthesizeSpeech = async (text) => {
  const polly = new aws.Polly({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  });

  const params = {
    OutputFormat: "mp3",
    Text: text,
    VoiceId: "Joanna", // Choose the voice you want to use
    TextType: "text",
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    const audioUrl = URL.createObjectURL(
      new Blob([data.AudioStream], { type: data.ContentType })
    );
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Error synthesizing speech:", error);
  }
};
