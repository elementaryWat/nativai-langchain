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
  ColumnBox,
  RowBox,
} from "../components/ProfileComponent/styled";
import LocalCafeTwoToneIcon from "@mui/icons-material/LocalCafeTwoTone";
import CancelIcon from "@mui/icons-material/Cancel";
import FreePlan from "@mui/icons-material/StarHalfSharp";
import { useSession } from "next-auth/react";
import ProIcon from "@mui/icons-material/StarsSharp";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import StreakIcon from "@mui/icons-material/LocalFireDepartment";
import WordsUsed from "@mui/icons-material/MessageSharp";
import { useRouter } from "next/router";
import { useUserData } from "@/store/user/useUserData";
import { Button, Typography } from "@mui/material";
import { OBJECTIVES, UserLevel, UserObjective } from "@/types/User";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import UpdateDialog from "@/components/UpdateProfileDialog/UpdateProfileDialog";
import { ProModal } from "@/components/ProModal/ProModal";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import { ANALYTICS_EVENTS, trackEvent } from "@/utils/analyticsMethods";
import { signOut } from "next-auth/react";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const fotoPerfil = session?.user?.image;
  const router = useRouter();
  const [dialogEditOpen, setDialogEditOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [showProModal, setShowProModal] = useState(false);

  const handleOpen = () => setDialogEditOpen(true);
  const handleClose = () => setDialogEditOpen(false);

  /////////////////////
  // const isProMember = false;
  ////////////////////

  const {
    coffees,
    username,
    objective,
    email,
    level,
    longestStreak,
    subscriptionStatus,
    loadingStatus,
    expirationDateSubscription,
    isProMember,
    sentencesUsedTotalCount,
    setUserData,
    cancelUserSubscription,
  } = useUserData();

  const currentDate = new Date();
  const expDate = expirationDateSubscription
    ? new Date(expirationDateSubscription)
    : null;
  const isExpired = expDate ? currentDate > expDate : true;

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

  const openProModal = () => {
    setShowProModal(true);
  };

  const openConfirmationDialog = () => {
    setDialogConfirmOpen(true);
  };

  const closeConfirmationDialog = () => {
    setDialogConfirmOpen(false);
  };

  const handleCancelSubscription = () => {
    cancelUserSubscription();
    trackEvent(ANALYTICS_EVENTS.CANCEL_SUBSCRIPTION);
    closeConfirmationDialog();
  };

  const isAuthorized = subscriptionStatus === "authorized";
  const icon = isProMember ? (
    <WorkspacePremiumTwoToneIcon style={{ color: "#efb810 " }} />
  ) : (
    <FreePlan style={{ color: "#efb810 " }} />
  );
  const planText = isProMember ? "Premium" : "Plan gratuito";
  const button = isAuthorized ? (
    <Button
      style={{ margin: ".5rem 0" }}
      variant="contained"
      onClick={openConfirmationDialog}
      endIcon={<CancelIcon />}
    >
      Cancelar suscripción
    </Button>
  ) : (
    <Button
      style={{ margin: ".5rem 0" }}
      startIcon={<ProIcon />}
      variant="contained"
      disabled={!isExpired || loadingStatus === "loading"}
      onClick={openProModal}
    >
      Actualizar a Pro
    </Button>
  );

  return (
    <PerfilContainer>
      {/* <FondoPerfil /> */}
      <BoxHeader>
        <Button
          sx={{
            fontFamily: "Helvetica",
            fontSize: "1rem",
            fontWeight: "700",
            borderRadius: "20px",
            position: "absolute",
            top: "15px",
            right: "45px",
            background: "#fff",
            color: "#673ab7",
            textTransform: "capitalize",
            "&:hover": {
              background: "#9862f5",
            },
          }}
          onClick={() => signOut()}
        >
          SignOut
        </Button>
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
            <LocalCafeTwoToneIcon color="primary" />
            {isProMember ? (
              <AllInclusiveIcon style={{ color: "#fff" }} />
            ) : (
              <p>{coffees}</p>
            )}
            <Typography style={{ fontSize: "0.7rem", textAlign: "center" }}>
              cafecitos disponibles
            </Typography>
          </BoxStatistics>
          <BoxStatistics>
            <StreakIcon color="primary" />
            <p>{longestStreak} d.</p>
            <Typography style={{ fontSize: "0.7rem", textAlign: "center" }}>
              maxima racha
            </Typography>
          </BoxStatistics>
          <BoxStatistics>
            <WordsUsed color="primary" />
            <p>{sentencesUsedTotalCount}</p>
            <Typography style={{ fontSize: "0.7rem", textAlign: "center" }}>
              oraciones usadas
            </Typography>
          </BoxStatistics>
        </RowDatoEstadistica>
      </SectionImagen>
      <BoxPerfil>
        <SectionPago>
          <Typography
            style={{ fontWeight: "bold", fontSize: "23px", color: "#888" }}
          >
            {username}
          </Typography>
          <RowDatoPago>
            <ColumnBox style={{ padding: ".5rem", width: "100%" }}>
              <RowBox style={{ margin: "0 0 1rem 0" }}>
                {icon}
                <Typography
                  style={{ fontWeight: "bold", fontSize: "23px" }}
                  color="secondary"
                >
                  {planText}
                </Typography>
                {icon}
              </RowBox>
              {button}
              {!isExpired && subscriptionStatus === "cancelled" && (
                <Typography style={{ fontSize: ".8rem" }}>
                  Fecha de vencimiento: {expDate?.toLocaleDateString()}
                </Typography>
              )}
            </ColumnBox>
          </RowDatoPago>
        </SectionPago>
        <SectionBasicData>
          <SectionDato>
            <Typography
              style={{ color: "#777", fontWeight: "800", fontSize: "15px" }}
              variant="h6"
            >
              Email: {email}
            </Typography>
          </SectionDato>
          <SectionDato>
            <Typography
              style={{ color: "#777", fontWeight: "800", fontSize: "15px" }}
              variant="h6"
            >
              Nivel: {level}
            </Typography>
          </SectionDato>
          <SectionDato>
            <Typography
              style={{ color: "#777", fontWeight: "800", fontSize: "15px" }}
              variant="h6"
            >
              {" "}
              Objetivo: {OBJECTIVES[objective]}
            </Typography>
          </SectionDato>
          <Button
            size="large"
            onClick={handleOpen}
            variant="contained"
            style={{ margin: "1rem 0 0 0" }}
          >
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
      <ProModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        userEmail={email}
      />
    </PerfilContainer>
  );
};

export default ProfilePage;
