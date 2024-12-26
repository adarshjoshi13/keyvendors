import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchNotificationsSMG } from "services/api";
import { useIsLarge } from "utils/hooks";
import { pagesList, profileMenuList, secondMenuList } from "utils/menuList";
import logo from "../../public/assets/logos/logo1.png";
import { getAuthInfo, getAuthToken, logout } from "../../store/authSlice";
import { clearCustomerDetail } from "../../store/cartSlice";
import { selectCartState } from "../../store/cartSlice";
import { UserButton } from "./Buttons";
import MenuDrawer from "./MenuDrawer";
import Submenu from "./Submenu";
import MegaMenu from "./MegaMenu";
import EmptyCart from "components/cart/EmptyCart";
import NotificationDialogBox from "components/cart/NotificationDialogbox";

import { setServices, getServices } from "store/servicesSlice";
import { Typography } from "@mui/material";
import useSWR from "swr";
import { setNotifications } from "../../store/notificationsSlice";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ImageWithFallback from "./ImageWithFallback";
import { styled } from "@mui/material/styles";
import 'bootstrap/dist/css/bootstrap.min.css';

function MainMenuItem({ page, index }) {
  return (
    <>
      {page.menuPopup ? (
        <MegaMenu
          buttonValue={
            <>
              {page.icon} 
              {page.title}
            </>
          }
          buttonProp={{
            sx: {
              fontSize: 16,
              fontWeight: 600,
              color: (theme) => theme.palette.primary.text,
              textTransform: "none",
            },
          }}
          id={`page${index}`}
          items={page.list}
          buttonLink={""}
        />
      ) : (
        <Button
          href={page.path}
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: (theme) => theme.palette.primary.text,
            textTransform: "none",
          }}>
          {page.icon}
          {page.title}
        </Button>
      )}
    </>
  );
}

export default function Header({ megaMenuList }) {
  const dispatch = useDispatch();
  const cartState = useSelector(selectCartState);
  const authToken = useSelector(getAuthToken);
  const authInfo = useSelector(getAuthInfo);
  const savedServices = useSelector(getServices);

  const [mobileOpen, setMobileOpen] = useState(false);
  const isLarge = useIsLarge();
  const [pages, setPages] = useState([]);

  const { data: notifications, error } = useSWR("notification-list", fetchNotificationsSMG, {
    revalidateOnFocus: false,
  });

  const handleDrawerToggle = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileOpen(!mobileOpen);
  };

  const logoutUser = () => {
    dispatch(logout(null));
    dispatch(clearCustomerDetail());
    Router.push("/");
  };

  const profileMenu = profileMenuList(authToken, logoutUser);
  const secondMenu = secondMenuList(isLarge, authToken);


  useEffect(() => {
    if (notifications) {
      console.log("object data", notifications.data.data.length);
      const notificationData = notifications.data;

      dispatch(setNotifications(notificationData));
    }
  }, [notifications, dispatch]);

  useEffect(() => {
    if (pages.length < 1) {
      if (!megaMenuList) {
        if (savedServices) {
          setPages(pagesList(savedServices));
        } else {
          (async () => {
            let res = await fetchData("services/menu");
            if (res) {
              setPages(pagesList(res));
              dispatch(setServices(res));
            }
          })();
        }
      } else {
        dispatch(setServices(megaMenuList));
        setPages(pagesList(megaMenuList));
      }
    }
  }, [megaMenuList, pages, dispatch, savedServices]);


  const NavigationLink = styled(Link)(({ theme }) => ({
    background: "transparent",
    cursor: "pointer",
    ...theme.typography.caption,
    color: theme.palette.primary.main,
    display: "block",
    fontStyle: "normal",
  }));

  return (
    <>
      <AppBar className="appBar" sx={{ height: "4rem" }}>
        <Toolbar>
          <Grid
            sx={{mt:2, pb:2 }}
            justifyContent={"end"}
            alignContent={"center"}
            alignItems="center"
            direction={"row"}
            container>
            <Grid lg={1} xs={8} md={11} item>
              <Link href="/" underline="none" color="inherit">
                  <Image src={logo} width={100} alt="Key Vendors" />
                </Link>
            </Grid>
            {isLarge && (
              <Grid
                lg={7}
                xs={0}
                md={0}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
                item>
                <Box
                  sx={{
                    display: "flex",
                    display: { xs: "none", md: "none", lg: "flex" },
                    
                       }}>
                  {pages.map((page, index) => (
                    <MainMenuItem key={index} page={page} index={index} />
                  ))}
                </Box>
              </Grid>
            )}
           
            <Grid
              lg={4}
              md={2}
              xs={4}
              sx={{
                 display: "flex",
                 alignItems: "center",
                alignContent: "center",
                justifyContent: { md: "left", xs: "end" },
                 
              }}
              item>
              <Box >
                <NavigationLink href="https://play.google.com/store/apps/details?id=in.keyvendors.app" underline="none">
                  <ImageWithFallback alt="Play Store" loading="lazy" width="150" height="50" src="https://www.keyvendors.com/public/images/googlePlay.png" />
                </NavigationLink>
              </Box>
              <Box sx={{
                padding:"10px",
              }}>
                 
                {notifications && authInfo?.name && notifications.data.data.length > 0 ? (
                  <Badge
                    color="secondary"
                    overlap="rectangular"
                    badgeContent={notifications.data.total || 0}
                  >
                    <NotificationDialogBox notifications={notifications} />
                    
                  </Badge>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", padding:"0px"}}>
                    {/* <Typography>No Notifications</Typography> */}
                    <NotificationsIcon />
                    {/* <NotificationDialogBox notifications={notifications} /> */}
                  </Box>
                )}

              </Box>

              {isLarge && (
                <Box sx={{ display: { lg: "block", xs: "none" } }}>
                  <Submenu
                    buttonValue={
                      <UserButton
                        text={authToken ? authInfo.name: "Sign in"}
                      />
                    }
                    id="login"
                    items={profileMenu}
                    buttonLink={authToken ? "/profile" : "/login"}
                  />
                </Box>
              )}
              <Box>
                {cartState ? (
                  <Submenu
                    buttonValue={
                      <Badge
                        className="test"
                        color="secondary"
                        overlap="rectangular"
                        badgeContent={cartState}>
                        <ShoppingCartIcon />
                      </Badge>
                    }
                    id="cart"
                    items={[]}
                    buttonLink="/cart"
                  />
                ) : (
                  <EmptyCart />
                )}
              </Box>
              {!isLarge && (
                <Box sx={{ display: { lg: "none" } }}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={handleDrawerToggle}
                    aria-label="menu">
                    {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {!isLarge && (
        <MenuDrawer
          items={savedServices}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          menuList={profileMenu}
          secondMenuList={secondMenu}
          loggedInfo={
            <UserButton
              href={authToken ? "/profile" : "/login"}
              text={authToken ? authInfo.name : "Sign in"}
              isMobile={true}
            />
          }
        />
      )}
    </>
  );
}
