import React from "react";
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
import LocalCafeTwoToneIcon from '@mui/icons-material/LocalCafeTwoTone';
import { useSession } from "next-auth/react";
import StarHalfSharpIcon from '@mui/icons-material/StarHalfSharp';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import LeaderboardSharpIcon from '@mui/icons-material/LeaderboardSharp';
import StarsSharpIcon from '@mui/icons-material/StarsSharp';
import { useRouter } from "next/router";
import { useUserData } from "@/store/user/useUserData";

const Perfil: React.FC = () => {
    const { data: session } = useSession();
    const fotoPerfil = session?.user?.image;
    const user = session?.user?.name;
    const email = session?.user?.email;
    const router = useRouter()

    const {coffees,username,level,subscriptionStatus} = useUserData()

    return (
        <PerfilContainer>
            {/* <FondoPerfil /> */}
            <BoxHeader>
                <ArrowBackIosSharpIcon onClick={()=>{router.push('/')}} style={{color:'#fff'}}/>
            </BoxHeader>
            <SectionImagen>
            
                <img
                        src={fotoPerfil}
                        alt="Imagen"
                        style={{
                            borderRadius:"50%",
                            objectFit:'cover',
                            transform: "scale(1.5)"
                        }}
                    />
                <RowDatoEstadistica>
                        {/* <h3>Cafe:</h3> */}
                        <BoxStatistics>
                            <p>{coffees}</p>
                            <LocalCafeTwoToneIcon style={{color:'#fff'}}/>
                        </BoxStatistics>
                        <BoxStatistics>
                            <p>{level}</p>
                            <LeaderboardSharpIcon style={{color:'#fff'}}/>
                        </BoxStatistics>
                        {/* <BoxStatistics>
                            <p>32</p>
                            <StarsSharpIcon style={{color:'#fff'}}/>
                        </BoxStatistics> */}
                </RowDatoEstadistica>
                </SectionImagen>
            <BoxPerfil>
                <BoxHeader>

                </BoxHeader>
                <SectionDato>
                    <h2>{user}</h2>
                    <p>{email}</p>
                </SectionDato>
                <SectionPago>
                    <RowDatoPago>
                        {/* <h3>Servicio:</h3> */}
                        <StarHalfSharpIcon/>
                        {subscriptionStatus == 'authorized'? (<p>Preemiun</p>):(<p>Freemiun</p>)}
                        <StarHalfSharpIcon/>
                    </RowDatoPago>
                    <RowDatoPago>
                        {/* <ButtonPago>
                            Cambiar Level
                        </ButtonPago> */}
                    </RowDatoPago>
                </SectionPago>
            </BoxPerfil>
        </PerfilContainer>
    );
};

export default Perfil;