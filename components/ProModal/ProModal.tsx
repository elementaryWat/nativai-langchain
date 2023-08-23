import axios from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useProModal } from "../../hooks/use-pro-modal";
import { tools } from "../../constants";
import { addSubscriptionIfNotExists } from "../../utils/firebaseFunctions";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export const ProModal: React.FC<ProModalProps> = ({
  isOpen,
  onClose,
  userEmail,
}) => {
  //   const proModal = useProModal();
  const [loading, setLoading] = useState(false);
  const TEST_USER = "test_user_1060745452@testuser.com";
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/payments/create-subscription-config",
        {
          payer_email: TEST_USER,
        }
      );

      const { data } = response;

      if (data && data.id) {
        const subscriptionDetails = {
          userId: userEmail,
          userIdTest: TEST_USER,
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography variant="h5">Actualizar a </Typography>
            <span
              style={{
                backgroundColor: "gold",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                textTransform: "uppercase",
                fontSize: "0.8rem",
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
                style={{ color: "primary", width: "20px", height: "20px" }}
              />
            </Card>
          ))}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={onSubscribe}
          variant="contained"
          color="primary"
          fullWidth
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
      </DialogActions>
    </Dialog>
  );
};