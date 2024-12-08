import PropTypes from "prop-types";
import { Badge, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow  } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import DialogBox from "components/style/DialogBox";

function NotificationDialogBox({ notifications }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Debug: Print notifications array
  console.log("Notifications array:", notifications);

  return (
    <>
      <Badge
        sx={{ cursor: "pointer", paddingRight:{xs:"0px"}}}
        onClick={handleOpen}
        className="test"
        color="secondary"
        overlap="rectangular"
      >
        <NotificationsIcon />
      </Badge>

      <DialogBox
        open={open}
        paperPropsSx={{ top: { lg: 80, md: 80 }, left: { lg: 900, md: 900 } }}
        disableAction={reason.length > 10 ? false : true}
        handleClose={handleClose}
      >
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            width: 325,
            height: 250,
            flexDirection: "column",
          }}
        >
          <Typography variant="h6"  sx={{
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
          }}>Notifications</Typography>

          {notifications?.data?.data && notifications.data.data.length  > 0 ? (
            <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Message</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.data.data.map((notification, index) => (
                <TableRow key={notification.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>{new Date(notification.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          ) : (
            <Typography variant="body2" sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mt: 2
            }}>
              No notifications available
            </Typography>
          )}
        </Box>
      </DialogBox>
    </>
  );
}

// Add PropTypes for type checking
NotificationDialogBox.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      created_at: PropTypes.string,
    })
  ).isRequired,
};

export default NotificationDialogBox;
