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

function WelcomeModal() {
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
            {cambio ? (
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
            )}
        </WelcomeContainer>
    );
}

export default WelcomeModal;
