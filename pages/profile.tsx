import React, { useState } from "react";
import {
    PerfilContainer,
    BoxPerfil,
    SectionImagen,
    SectionDato,
    RowBox,
    ButtonPago,
    BoxHeader,
    RowDatoEstadistica,
    BoxStatistics,
    SectionCaffe,
    SectionBoxBtn,
    SectionBoxEtiqueta,
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
import { Button, styled } from "@mui/material";
import { OBJECTIVES, UserLevel, UserObjective } from "@/types/User";
import UpdateDialog from "@/components/UpdateProfileDialog/UpdateProfileDialog";
import { Subscription } from "../types/Subscription";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';



const StyledIcon = styled(ManageAccountsIcon)`
  color: #673AB7;
  width: 20px;

  &:hover {
    color: #fff;
  }
`
const StyledIconMember = styled(CancelPresentationIcon)`
  color: #673AB7;
  width: 20px;

  &:hover {
    color: #fff;
  }
`

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
            <BoxHeader>
                <ArrowBackIosSharpIcon
                    onClick={() => {
                        router.push("/");
                    }}
                    style={{ color: "#fff" }}
                />
            </BoxHeader>
            <BoxHeader>
                <p>Bienvenido</p> <h2>{username}</h2>
            </BoxHeader>
            <BoxHeader></BoxHeader>
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
                <SectionDato>
                    {/* <p>{email}</p> */}
                    <p>{level}</p>
                    <p>{OBJECTIVES[objective]}</p>
                </SectionDato>
            </SectionImagen>
            <SectionCaffe>
                <BoxStatistics>
                    {isProMember ? (
                        <AllInclusiveIcon color="info" />
                    ) : (
                        <p style={{ color: "#673AB7" }}>{coffees}</p>
                    )}
                    <LocalCafeTwoToneIcon style={{ color: "#673AB7" }} />
                </BoxStatistics>
            </SectionCaffe>
            <BoxPerfil>
              
                <RowBox>
                <SectionBoxEtiqueta>
                        {/* <StarHalfSharpIcon style={{ color: "#9d37a7" }} /> */}
                        {isProMember ? <p>Premium</p> : <p>Freemium</p>}
                        {/* <StarHalfSharpIcon style={{ color: "#9d37a7" }} /> */}
                </SectionBoxEtiqueta>
                </RowBox>
                <RowBox>
                <SectionBoxBtn onClick={handleOpen}>
                    <StyledIcon style={{ color: "#9d37a7",width:'20px' }}/>
                </SectionBoxBtn>
                <SectionBoxBtn>
                    <StyledIconMember style={{ color: "#9d37a7",width:'20px' }}/>
                </SectionBoxBtn>
                </RowBox>
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
