import { Popover, Typography, Box } from "@mui/material";
import { FeedBack } from "../../types/Message";

interface FeedbackPopoverProps {
  id: string;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  feedback: FeedBack;
}

const FeedbackPopover = ({
  id,
  open,
  anchorEl,
  onClose,
  feedback,
}: FeedbackPopoverProps) => (
  <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Grammar tips:
      </Typography>
      <Typography variant="body2" gutterBottom>
        {feedback.grammar_feedback}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Vocabulary tips:
      </Typography>
      <Typography variant="body2" gutterBottom>
        {feedback.vocabulary_feedback}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="secondary">
        Score: {feedback.score}
      </Typography>
    </Box>
  </Popover>
);

export default FeedbackPopover;
