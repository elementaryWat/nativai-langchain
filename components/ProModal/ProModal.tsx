import axios from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { tools } from "../../constants";
import { addSubscriptionIfNotExists } from "../../utils/firebaseFunctions";
import { ANALYTICS_EVENTS, trackEvent } from "@/utils/analyticsMethods";
import StopWatchTimer from "./StopwatchTimer";
import { useUserData } from "@/store/user/useUserData";
// import { useUserData } from "@/store/user/useUserData";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  //   const proModal = useProModal();
  const [loading, setLoading] = useState(false);
  const { emailMP, email } = useUserData();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const TEST_USER = testEmail || "test_user_784417862@testuser.com";
  const originalPrice = 14.99;
  const discountPrice = 0.99;
  const expirationOffer = new Date(Date.UTC(2023, 8, 4, 3, 0, 0));

  const onSubscribe = async () => {
    try {
      setLoading(true);
      trackEvent(ANALYTICS_EVENTS.CLICK_SUBSCRIPTION_BTN);
      if (!emailMP || emailMP === "") {
        setSnackbarOpen(true);
      }

      const response = await axios.post(
        "/api/payments/create-subscription-config",
        {
          payer_email: emailMP,
        }
      );

      const { data } = response;

      if (data && data.id) {
        const subscriptionDetails = {
          userId: email,
          // userIdTest: TEST_USER,
          subscriptionStatus: data.status,
          subscriptionId: data.id,
          dateCreated: data.date_created,
        };

        await addSubscriptionIfNotExists(subscriptionDetails);

        window.location.href = data.init_point;
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog style={{ height: "auto" }} open={isOpen} onClose={onClose}>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          height: "auto",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            backgroundColor: "#2a1d4c",
            width: "120px",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            margin: "5px",
            marginTop: "-90px",
            position: "fixed",
            borderRadius: "100%",
            padding: "70px",
            color: "#fff",
            transform: "scale(.5)",
          }}
        >
          NATIV
          <span
            style={{
              color: "#6e45ff",
            }}
          >
            AI
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            paddingBottom: "1rem",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              font: "inherit",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h5">Actualizar a </Typography>
            <span
              style={{
                backgroundColor: "#2a1d4c",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Pro
            </span>
          </div>
        </div>
        <Typography align="center" variant="body1">
          {tools.map((tool) => (
            <Card
              key={tool.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0.5rem 0",
              }}
            >
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      backgroundColor: tool.bgColor,
                    }}
                  >
                    {/* <tool.icon
                      style={{
                        width: "24px",
                        height: "24px",
                        color: tool.color,
                      }}
                    /> */}
                  </div>
                  <Typography variant="body2">{tool.label}</Typography>
                </div>
              </CardContent>
              <Check
                style={{
                  color: "green",
                  width: "25px",
                  height: "20px",
                  fontWeight: "800",
                  fontSize: "55px",
                }}
              />
            </Card>
          ))}
        </Typography>
        <Card
          style={{
            // marginTop: "1rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "1rem",
            background: "linear-gradient(to top, #673ab7, #ffffff)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{
              font: "inherit",
              fontSize: "25px",
              fontWeight: "500",
              color: "#673ab7",
              textTransform: "uppercase",
              transform: "scale(.7)",
            }}
          >
            Oferta de lanzamiento!!!
          </Typography>
          <Typography
            variant="h5"
            style={{
              textDecoration: "line-through",
              color: "#888",
              transform: "scale(.5)",
            }}
          >
            U$D{originalPrice}/Mes
          </Typography>
          <Typography
            variant="h4"
            style={{
              color: "green",
              marginTop: "0.5rem",
              transform: "scale(.7)",
            }}
          >
            U$D {discountPrice}/Mes
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: "red",
              fontStyle: "bold",
              fontSize: "1.2rem",
              transform: "scale(.7)",
            }}
          >
            (Oferta x tiempo limitado -93.3% off!)
          </Typography>
          <StopWatchTimer expiryTimestamp={expirationOffer} />
          <Button
            color="success"
            variant="contained"
            disabled={loading}
            onClick={onSubscribe}
          >
            Actualizar plan
            <Zap
              style={{
                width: "16px",
                height: "16px",
                marginLeft: "0.5rem",
                fill: "#fff",
              }}
            />
          </Button>
        </Card>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Modificar el mail de su cuenta Mercado Pago en el perfil
          </Alert>
        </Snackbar>
      </DialogContent>
    </Dialog>
  );
};
