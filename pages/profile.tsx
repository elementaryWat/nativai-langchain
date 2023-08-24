import React, { useState } from "react";
import {
  PerfilContainer,
  BoxPerfil,
  SectionImagen,
  SectionDato,
  SectionPago,
  RowDatoPago,
  ButtonPago,
  BoxHeader,
  RowDatoEstadistica,
  BoxStatistics,
} from "../components/PerfilComponent/style";
import FondoPerfil from "../components/PerfilComponent/FondoPerfil/FondoPerfil";
import LocalCafeTwoToneIcon from "@mui/icons-material/LocalCafeTwoTone";
import { useSession } from "next-auth/react";
import StarHalfSharpIcon from "@mui/icons-material/StarHalfSharp";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import LeaderboardSharpIcon from "@mui/icons-material/LeaderboardSharp";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import { useRouter } from "next/router";
import { useUserData } from "@/store/user/useUserData";
import WelcomeModal from "@/components/WelcomeModal/WelcomeModal";
import { Button } from "@mui/material";
import { OBJECTIVES, UserLevel, UserObjective } from "@/types/User";
import UpdateDialog from "@/components/UpdateProfileDialog/UpdateProfileDialog";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const fotoPerfil = session?.user?.image;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    coffees,
    username,
    objective,
    email,
    level,
    isProMember,
    setUserData,
  } = useUserData();

  const handleUpdate = async (
    updatedUsername: string,
    updatedLevel: UserLevel,
    updatedObjective: UserObjective
  ) => {
    await setUserData({
      name: updatedUsername,
      level: updatedLevel,
      objective: updatedObjective,
    });
    handleClose();
  };

  return (
    <PerfilContainer>
      {/* <WelcomeModal /> */}
      {/* <FondoPerfil /> */}
      <BoxHeader>
        <ArrowBackIosSharpIcon
          onClick={() => {
            router.push("/");
          }}
          style={{ color: "#fff" }}
        />
      </BoxHeader>
      <SectionImagen>
        <img
          src={fotoPerfil}
          alt="Imagen"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            transform: "scale(1.5)",
          }}
        />
        <RowDatoEstadistica>
          {/* <h3>Cafe:</h3> */}
          <BoxStatistics>
            {isProMember ? <AllInclusiveIcon color="info" /> : <p>{coffees}</p>}
            <LocalCafeTwoToneIcon style={{ color: "#fff" }} />
          </BoxStatistics>
          {/* <BoxStatistics>
                            <p>{level}</p>
                            <LeaderboardSharpIcon style={{color:'#fff'}}/>
                        </BoxStatistics> */}
          {/* <BoxStatistics>
                            <p>32</p>
                            <StarsSharpIcon style={{color:'#fff'}}/>
                        </BoxStatistics> */}
        </RowDatoEstadistica>
      </SectionImagen>
      <BoxPerfil>
        <BoxHeader></BoxHeader>
        <SectionDato>
          <h2>{username}</h2>
          <p>{email}</p>
          <p>{level}</p>
          <p>{OBJECTIVES[objective]}</p>
          <Button size="small" onClick={handleOpen}>
            Update
          </Button>
        </SectionDato>
        <SectionPago>
          <RowDatoPago>
            <StarHalfSharpIcon />
            {isProMember ? <p>Premium</p> : <p>Freemium</p>}
            <StarHalfSharpIcon />
          </RowDatoPago>
          <RowDatoPago>
            {/* <ButtonPago>
                            Cambiar Level
                        </ButtonPago> */}
          </RowDatoPago>
        </SectionPago>
      </BoxPerfil>
      <UpdateDialog
        open={open}
        onClose={handleClose}
        onUpdate={handleUpdate}
        defaultUsername={username}
        defaultLevel={level}
        defaultObjective={objective}
      />
    </PerfilContainer>
  );
};

export default ProfilePage;
