import { Button, Grid, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const PageContainer = styled(Grid)<{ background?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  color: white;
  background-color: #ffffff;
  padding: 0 1rem;
  // border-radius: 20px;
  // background: ${({ background }) => background || "transparent"};
`;

export const StyledTextField = styled(TextField)`
  && {
    margin: 10px;
    width: 100%;
    color: #bcbcbd;
    padding-bottom: 3rem;
    .MuiInputBase-root {
      color: #bcbcbd;
      border-radius: 1rem;
    }
    .MuiFormLabel-root {
      color: #bcbcbd;
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: #8a2be2;
    }
  }
`;

export const Title = styled("h1")`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const StyledRadioButton = styled(Button)(
  ({ theme, selected }: { theme: any; selected: boolean }) => ({
    backgroundColor: selected
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
    color: selected ? theme.palette.text.secondary : theme.palette.text.main,
    margin: "1rem 0",
    width: "50%",
    borderRadius: "30px",
    height: "100px",
    "&:hover": {
      backgroundColor: selected
        ? theme.palette.secondary.dark
        : theme.palette.secondary.light,
    },
    "@media screen and (max-width: 768px)": {
      width: "90%",
      fontSize: "14px",
    },
  })
);

export const StyledRadioButtonTopic = styled(Button)(
  ({ theme, selected }: { theme: any; selected: boolean }) => ({
    backgroundColor: selected
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
    color: selected ? theme.palette.text.secondary : theme.palette.text.main,
    margin: "5px",
    width: "40%",
    borderRadius: "30px",
    height: "120px",
    "&:hover": {
      backgroundColor: selected
        ? theme.palette.secondary.dark
        : theme.palette.secondary.light,
    },
  })
);

export const StyledButton = styled(Button)`
  margin-top: 20px;
  padding: 1rem;
  font-size: 1.2rem;
  background-color: #3f51b5;
  color: white;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #303f9f;
  }
`;
