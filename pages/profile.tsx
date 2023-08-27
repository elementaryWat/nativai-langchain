import React, { useState } from "react";
import {
  PerfilContainer,
  BoxPerfil,
  SectionImagen,
  SectionDato,
  SectionPago,
  RowDatoPago,
  BoxHeader,
  RowDatoEstadistica,
  BoxStatistics,
  SectionBasicData,
} from "../components/ProfileComponent/styled";
import LocalCafeTwoToneIcon from "@mui/icons-material/LocalCafeTwoTone";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSession } from "next-auth/react";
import StarHalfSharpIcon from "@mui/icons-material/StarHalfSharp";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import StreakIcon from "@mui/icons-material/LocalFireDepartment";
import { useRouter } from "next/router";
import { useUserData } from "@/store/user/useUserData";
import { Button, IconButton, Typography } from "@mui/material";
import { OBJECTIVES, UserLevel, UserObjective } from "@/types/User";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import UpdateDialog from "@/components/UpdateProfileDialog/UpdateProfileDialog";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const fotoPerfil = session?.user?.image;
  const router = useRouter();
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);

  const handleOpen = () => setDialogEditOpen(true);
  const handleClose = () => setDialogEditOpen(false);

  const {
    coffees,
    username,
    objective,
    email,
    level,
    longestStreak,
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

  const openConfirmationDialog = () => {
    setDialogConfirmOpen(true);
  };

  const closeConfirmationDialog = () => {
    setDialogConfirmOpen(false);
  };

  const handleCancelSubscription = () => {
    // Lógica real para cancelar la suscripción aquí...
    closeConfirmationDialog();
  };

  return (
    <PerfilContainer>
      {/* <FondoPerfil /> */}
      <BoxHeader>
        {/* <ArrowBackIosSharpIcon
          onClick={() => {
            router.push("/");
          }}
          style={{ color: "#fff" }}
        /> */}
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
          <BoxStatistics>
            {isProMember ? (
              <AllInclusiveIcon style={{ color: "#fff" }} />
            ) : (
              <p>{coffees}</p>
            )}
            <LocalCafeTwoToneIcon style={{ color: "#fff" }} />
          </BoxStatistics>
          <BoxStatistics>
            <p>{longestStreak}</p>
            <StreakIcon style={{ color: "#fff" }} />
          </BoxStatistics>
        </RowDatoEstadistica>
      </SectionImagen>
      <BoxPerfil>
        <SectionPago>
          <Typography variant="h5" mb={2}>
            {username}
          </Typography>
          <RowDatoPago>
            {isProMember ? (
              <>
                <StarHalfSharpIcon color="primary" />
                <Typography color="secondary">Premium plan</Typography>
                <StarHalfSharpIcon color="primary" />
                <IconButton
                  size="large"
                  color="warning"
                  onClick={openConfirmationDialog}
                >
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <p>Free plan</p>
            )}
          </RowDatoPago>
          <RowDatoPago>
            {/* <ButtonPago>
                            Cambiar Level
                        </ButtonPago> */}
          </RowDatoPago>
        </SectionPago>
        <SectionBasicData>
          <SectionDato>
            <Typography variant="h6">Email: {email}</Typography>
          </SectionDato>
          <SectionDato>
            <Typography variant="h6">Nivel: {level}</Typography>
          </SectionDato>
          <SectionDato>
            <Typography variant="h6">
              {" "}
              Objetivo: {OBJECTIVES[objective]}
            </Typography>
          </SectionDato>
          <Button size="large" onClick={handleOpen}>
            Actualizar datos
          </Button>
        </SectionBasicData>
      </BoxPerfil>
      <ConfirmDialog
        openDialog={dialogConfirmOpen}
        onCloseConfirmationDialog={closeConfirmationDialog}
        onConfirmText={
          " ¿Estás seguro de que quieres cancelar tu suscripción Premium?"
        }
        onConfirmAction={handleCancelSubscription}
        onConfirmTextAction={"Si, cancelar"}
      />
      <UpdateDialog
        open={dialogEditOpen}
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
