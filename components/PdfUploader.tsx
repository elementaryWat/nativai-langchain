import React, { ChangeEvent, useState } from "react";

const PdfUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files && event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);

      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = async () => {
        const base64File = reader.result?.toString().split("base64,")[1];
        if (base64File) {
          const response = await fetch("/api/file/processPdf", {
            method: "POST",
            headers: { "Content-Type": "application/base64" },
            body: base64File,
          });

          const data = await response.json();
          console.log(data);
        }
      };
    } else {
      setFile(null);
    }
  };
  return (
    <input type="file" accept="application/pdf" onChange={handleFileChange} />
  );
};

export default PdfUploader;
