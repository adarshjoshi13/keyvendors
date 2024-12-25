import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
export default function Copyright() {
  const CopyrightText = styled(Typography)(({ theme }) => ({
    background: "transparent",
    ...theme.typography.caption,
    color: theme.palette.primary.main,
    display: "block",
    fontStyle: "normal",
  }));

  return (
    <Typography variant="caption" color="textSecondary" align="center">
      <CopyrightText>
        {"Copyright © "} Keyvendors India Pvt.Ltd. {new Date().getFullYear()}
      </CopyrightText>{" "}
    </Typography>
  );
}
