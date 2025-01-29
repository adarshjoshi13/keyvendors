import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import AccordionContent from "./AccordionContent";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ServicesMenu from "./ServicesMenu";
const drawerWidth = "auto"; //"240";
const anchorPosition = "top";

function MenuDrawer(props) {
  const {
    items,
    window,
    mobileOpen,
    handleDrawerToggle,
    menuList,
    secondMenuList,
    loggedInfo,
  } = props;

  const drawer = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : drawerWidth,
      }}>
      <Divider />
      <List>
        <ListItem alignItems="center" divider>
          {loggedInfo && <>{loggedInfo}</>}
        </ListItem>
        <ListItem alignItems="center" sx={{ justifyContent: "center" }} divider>
          
          <AccordionContent
            sx={{ boxShadow: "none", width: "100%" }}
            defaultExpanded={false}
            noBorder={true}
            id="dmenu"
            title={<><MiscellaneousServicesIcon sx={{ mr:3 }} />Our Services</>}>
            <ServicesMenu items={items} sx={{ m: 0, maxHeight: "auto" }} />
          </AccordionContent>
        </ListItem>
        {menuList.map((item, index) => (
          <ListItem
            key={index}
            {...(item.isClick
              ? { onClick: item.method }
              : {
                  component: "a",
                  onClick: handleDrawerToggle,
                  href: item.path,
                })}
            disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
              <ListItemText primary={item.title}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondMenuList.map((item, index) => (
          <ListItem
            key={index}
            {...(item.isClick
              ? { onClick: item.method }
              : {
                  component: "a",
                  onClick: handleDrawerToggle,
                  href: item.path,
                })}
            disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
              <ListItemText primary={item.title}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="Mobile Menu">
      <SwipeableDrawer
        anchor={anchorPosition}
        container={container}
        variant="persistent"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        PaperProps={{
          sx: {
            m: { md: 6, sm: 6, xs: 0 },
            top: { md: 130, sm: 130, xs: 80 },
            borderRadius: { md: ".5rem", sm: ".5rem", xs: "0" },
          },
        }}
        sx={{
          display: { xs: "block", md: "block", sm: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}>
        {drawer(anchorPosition)}
      </SwipeableDrawer>
    </Box>
  );
}

MenuDrawer.propTypes = {
  window: PropTypes.func,
};

export default MenuDrawer;
