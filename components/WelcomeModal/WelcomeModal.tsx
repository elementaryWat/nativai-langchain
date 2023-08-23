import React, { useEffect, useState } from "react";
import {
  WelcomeContainer,
  WelcomeImgClose,
  WelcomeImgOpen,
  WelcomeTitle,
} from "./styled";
import close from "../../asset/img/cerraada-removebg-preview.png";
import open from "../../asset/img/abierta-removebg-preview.png";
import Image from "next/image";
import { ProtobufNullValue } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { Container, Typography, Paper, Link as NextLink } from "@mui/material";
import Confetti from "react-confetti";
import bonete from "../../asset/img/bonete.png";
import confetiBg from "@/asset/img/confeti-bg.jpg";

function WelcomeModal({ name }) {
  const [cambio, setCambio] = useState(true);
  const [text, setText] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCambio(false);
      setText(false);
    }, 3000);
  }, []);

  return (
    <WelcomeContainer>
      <Container maxWidth="sm">
        <Confetti
          width={1920} // Ancho de la pantalla
          height={1080} // Alto de la pantalla
          recycle={true} // El confeti se repite
          numberOfPieces={200} // Cambia el número de piezas según lo desees
          tweenDuration={4000} // Cambia la duración en milisegundos según lo desees
        />
        <Paper
          elevation={3}
          style={{
            borderRadius: "10px",
            padding: "50px",
            textAlign: "center",
            backgroundImage: `url(@/asset/img/confeti-bg.jpg)`, // Reemplaza con la ruta de tu imagen
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            <Image src={bonete} alt="bonete" style={{ padding: "0px" }} />
          </Typography>
          <Typography variant="h4" gutterBottom>
            Welcome on Board
          </Typography>
          <Typography variant="h5" gutterBottom>
            {name}!
          </Typography>
          <NextLink
            href="/chat"
            style={{
              padding: "10px",
              background: "linear-gradient(180deg, #9d37a7 45%, #a555b9 90%)", // Corrección en la propiedad background
              width: "auto", // Cambiado de 10px a "auto" para adaptarse al contenido
              display: "inline-block", // Agregado para que el enlace ocupe solo el ancho del contenido
              textDecoration: "none", // Agregado para eliminar la subrayado predeterminado
              color: "white", // Cambiado el color del texto para mayor visibilidad
              borderRadius: "5px", // Agregado para redondear los bordes
              cursor: "pointer", // Agregado para mostrar un cursor de puntero al pasar el ratón
            }}
          >
            Let's go!
          </NextLink>
        </Paper>
      </Container>
      {/* {cambio ? (
                <WelcomeImgClose>
                    <Image src={close} alt="" />
                </WelcomeImgClose>
            ) : (
                <WelcomeImgOpen>
                    <Image src={open} alt="" />
                    <WelcomeTitle>
                        <h2>Welcome to NativaI</h2>
                    </WelcomeTitle>
                </WelcomeImgOpen>
            )} */}
    </WelcomeContainer>
  );
}

export default WelcomeModal;
