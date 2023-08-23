import { styled, keyframes } from "@mui/system";
import Fab from "@mui/material/Fab";

export const PerfilContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #9d37a7;
  width: 100vw;
  height: 100vh;

  @media (min-width: 768px) {
  }
`;

export const BoxPerfil = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e2e2e2;
  width: 100%;
  height: 55%;
  border-radius: 100px 100px 0 0;
  z-index: 100;
  padding: 3rem 0 0 0;
  box-shadow: 0 0 5px 1px #fff;

  @media (max-width: 768px) {
    width: 100%;
    heigth: 50%;
  }
`;

export const BoxHeader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 3rem;
  padding: 0.5rem 1rem;

  @media (max-width: 768px) {
    width: 100%;
    height: 3rem;
    padding: 1rem 2rem;
  }
`;

export const SectionImagen = styled("div")`
  width: 90%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
  justify-content: center;
  border-radius: 50%;
  object-fit: cover;
  z-index: 100;
  margin: 1rem;

  img {
    box-shadow: 0 0 5px 1px #fff;
    margin: 0 0 1rem 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 2rem;
    padding: 1rem 2rem;
    flex-direction: column;
  }
`;

export const SectionDato = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 33%;
  background-color: #d2d2d2;
  box-shadow: 0 0 5px 1px #999;

  h2 {
    font-size: 24px;
    color: #6d6d6d;
  }
`;
export const SectionPago = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  width: 90%;
  height: 50%;
  padding: 1rem 0;
`;

export const RowDatoPago = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2rem%;

  h3 {
    color: #6d6d6d;
    margin: 0 1rem 0 0;
  }

  p {
    font-weight: bold;
    margin: 0 1rem;
    font-size: 1.5rem;
    color: #6d6d6d;
  }
`;

export const RowDatoEstadistica = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 2rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
  }
`;

export const BoxStatistics = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  margin: 2rem 0 0 0;

  h3 {
    color: #6d6d6d;
    margin: 0 1rem 0 0;
  }

  p {
    font-weight: bold;
    margin: 0 1rem;
    font-size: 1.5rem;
    color: #fff;
  }
`;

export const ButtonPago = styled("button")`
  padding: 0.5rem 1rem;
  border-radius: 30px;
  border: none;
  background-color: #9d37a7;
  color: #e2e2e2;
  font-weight: bold;
`;

export const FondoContainer = styled("div")`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 40;
  overflow: hidden;
`;

export const Circulo1 = styled("div")`
  position: relative;
  width: 30vw;
  height: 60vh;
  flex-shrink: 0;
  background-color: #822b8a;
  border-radius: 50%;
  /* background-color: #fff; */
  top: 30%;
  left: 50%;
  z-index: 20;

  @media (max-width: 950px) {
    position: absolute;
    width: 60vw;
    height: 30vh;
    flex-shrink: 0;
    background-color: #822b8a;
    border-radius: 50%;
    /* background-color: #fff; */
    top: 45%;
    left: 50%;
    z-index: 20;
  }
`;

export const Circulo2 = styled("div")`
  position: relative;
  width: 20vw;
  height: 40vh;
  flex-shrink: 0;
  background-color: #822b8a;
  border-radius: 50%;
  /* background-color: #fff; */
  top: -60%;
  left: 2%;
  z-index: 20;

  @media (max-width: 950px) {
    position: absolute;
    width: 60vw;
    height: 30vh;
    flex-shrink: 0;
    background-color: #822b8a;
    border-radius: 50%;
    /* background-color: #fff; */
    top: 70%;
    left: 3%;
    z-index: 20;
  }
`;

export const Circulo3 = styled("div")`
  position: relative;
  width: 30vw;
  height: 60vh;
  flex-shrink: 0;
  background-color: #822b8a;
  border-radius: 50%;
  /* background-color: #fff; */
  top: -80%;
  left: 10%;
  z-index: 20;

  @media (max-width: 950px) {
    position: absolute;
    width: 30;
    height: 15vh;
    flex-shrink: 0;
    background-color: #822b8a;
    border-radius: 50%;
    /* background-color: #fff; */
    top: 10%;
    left: 80%;
    z-index: 20;
  }
`;

export const Circulo4 = styled("div")`
  position: relative;
  width: 20vw;
  height: 40vh;
  flex-shrink: 0;
  background-color: #822b8a;
  border-radius: 50%;
  /* background-color: #fff; */
  top: -160%;
  left: 80%;
  z-index: 20;

  @media (max-width: 950px) {
    position: absolute;
    width: 16vw;
    height: 8vh;
    flex-shrink: 0;
    background-color: #822b8a;
    border-radius: 50%;
    /* background-color: #fff; */
    top: 50%;
    left: 25%;
    z-index: 20;
  }
`;

export const Circulo5 = styled("div")`
  position: relative;
  width: 15vw;
  height: 30vh;
  flex-shrink: 0;
  background-color: #822b8a;
  border-radius: 50%;
  /* background-color: #fff; */
  top: -200%;
  left: 70%;
  z-index: 20;

  @media (max-width: 950px) {
    position: absolute;
    width: 60vw;
    height: 30vh;
    flex-shrink: 0;
    background-color: #822b8a;
    border-radius: 50%;
    /* background-color: #fff; */
    top: 2%;
    left: 5%;
    z-index: 20;
  }
`;
