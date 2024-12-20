import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ConstructionIcon from "@mui/icons-material/Construction";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import InputIcon from '@mui/icons-material/Input';
import { SvgIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import EngineeringIcon from '@mui/icons-material/Engineering';
// Custom Bale Icon
function BaleIcon(props) {
  return (
    <SvgIcon {...props}>
      {/* Replace with the SVG path data for the bale icon */}
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

// https://keyvendors.com

// ${process.env.CDN_URL}/partner

export const pagesList = (list,notificationList)=>[
    { title: "Professional Register",path:`/partner`,icon:<EngineeringIcon/>},
    { title: "Our Services", menuPopup: true,list:list, icon:(<><MiscellaneousServicesIcon /></>)},
    { title: "Blog" ,path:"/blogs",icon:(<><RssFeedIcon /></>)},
    {title: "9018181818",path:"tel:9018181818",icon: (
      <>
        <PhoneInTalkIcon />{notificationList}
      </>
    ), },
  ];

export const secondMenuList =(isLarge,authToken)=> [
  { title: "Professional Register",path:`${process.env.CDN_URL}/partner`,icon:<EngineeringIcon/> },
  { title: "Blog" ,path:"https://keyvendors.com/blogs",icon:<RssFeedIcon />},
  { title: "9018181818",path:"tel:9018181818",icon: (
    <>
      <PhoneInTalkIcon />
    </>
  ), },
  {icon: (
    <>
      <NotificationsIcon style={{ marginLeft: 8 }} /> {/* Your custom Bale icon */}
    </>
  )}
  ];

export const profileMenuList = (authToken,logoutUser) => [
  ...(!authToken
    ? [{ title: "Sign In/Sign Up", icon: <LoginIcon />, path: "/login" }]
    : [
        {
          title: "My Profile",
          icon: <AccountBoxIcon />,
          path: "/profile#info",
        },
      ]),
      ...( authToken
        ? [
            {
              title: "My Requests",
              icon: <ConstructionIcon />,
              path: "/profile#request",
            },
          ]
        : []),
  {
    title: "Raise Service Request",
    icon: <RequestPageIcon />,
    path: "/raise-request",
  },

  { title: "Contact US", icon: <ContactPhoneIcon />, path: "/contact-us" },

  ...(authToken
    ? [
        {
          title: "Logout",
          icon: <LogoutIcon />,
          isClick: true,
          method: logoutUser,
        },
      ]
    : []),
];
