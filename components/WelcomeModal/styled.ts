import { styled, keyframes } from "@mui/system";
import Fab from "@mui/material/Fab";

export const WelcomeContainer = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9d37a7;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    @media (min-width: 768px) {
    }
`;

export const WelcomeTitle = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    color:#f1f1f1;
    width: 100vw;
    height: 100vh;
    animation: grow 2s ease-in-out forwards;
    position: absolute;
    top: 0%;
    left: 0%;
    z-index: 1010;

    @keyframes grow {
        0% {
            width: 100vw;
            height: 100vh;
            border-radius: 50%;
            transform: scale(0.01);
            background-color: transparent;
        }
        50%{
            border-radius: 50%;
        }

        80%{
            border-radius: 50%;
        }
        100% {
            transform: scale(1);
            background-color: #9d37a7;
            border-radius: 0px;
        }
    }

    h2 {
        text-align:center;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: textGrow 2s ease-in-out forwards;

        @keyframes textGrow {
            from {
                font-size: 1px;
            }
            to {
                font-size: 40px;
            }
        }
    }

    

    
`;


export const WelcomeImgClose = styled("div")`
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // color:#f1f1f1;
    // width: 100vw;        
    animation: grow 3s ease-in-out forwards;

    @keyframes grow {
        from {
            transform: scale(0.01);
        }
        to {
            transform: scale(1);
        }
    }

    

    
`;

export const WelcomeImgOpen = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    color:#f1f1f1;
    width: 100vw;    
    

    img{
        animation: open 2s ease-in-out forwards;
    }
    @keyframes open {
        from {
            transform: scale(1);
        }
        to {
            transform: scale(10);
        }
    }

`;