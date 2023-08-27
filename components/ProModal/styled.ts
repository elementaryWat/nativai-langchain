import {
  Card,
  CardContent,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import styled from "styled-components";
export const DialogContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const BrandLogo = styled.div`
  font-size: 30px;
  background-color: #2a1d4c;
  width: 120px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin: 5px;
  margin-top: -90px;
  position: fixed;
  border-radius: 100%;
  padding: 70px;
  color: #fff;
`;

export const BrandLogoHighlight = styled.span`
  color: #6e45ff;
`;

export const ProContainer = styled.div`
  font: inherit;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProBadge = styled.span`
  background-color: #2a1d4c;
  padding: 0.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
`;

export const ToolCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

export const ToolCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ToolIconContainer = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

export const OfferCard = styled(Card)`
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LaunchOffer = styled(Typography)`
  font: inherit;
  font-size: 25px;
  font-weight: 500;
  text-transform: uppercase;
`;

export const OriginalPrice = styled(Typography)`
  text-decoration: line-through;
  color: #888;
`;

export const DiscountPrice = styled(Typography)`
  color: green;
  margin-top: 0.5rem;
`;

export const LimitedOffer = styled(Typography)`
  color: red;
  margin-top: 0.5rem;
`;

export const DialogActionContainer = styled(DialogActions)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
