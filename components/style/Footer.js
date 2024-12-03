import Copyright from "./Copyright";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { clearLocation } from "store/locationSlice";
import { fetchData } from "services/api";
import { useRouter } from "next/router";
import ImageWithFallback from "./ImageWithFallback";
export default function Footer() {
  const { data, error, isLoading } = useSWR("location/cities", fetchData,{ revalidateOnFocus: false });
  const dispatch = useDispatch();
  const router = useRouter();
  const goToLocationPage = (e, slug) => {
    e.preventDefault();
    dispatch(clearLocation());
    router.push(slug);
  };

  const Item = styled(Box)(({ theme }) => ({
    background: "transparent",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.primary.main,
  }));
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
      <Box sx={{ bgcolor: "secondary.main", p:{ xs: 2, sm: 2, md: 6 }}} component="footer">
        <Grid container spacing={2}>
          <Grid item lg={1}>
            {" "}
          </Grid>
          <Grid item lg={4} xs={12}>
            <Item>
              {" "}
              <Typography variant="h6" align="left" gutterBottom>
                Key Vendors India Pvt.Ltd.
              </Typography>
              <Typography variant="caption" align="left" component="p" sx={{paddingBottom:{xs:2,sm:2,md:0}}}>
                Our primary principle is to connect customers with best match
                packers and movers who can deliver secure and ecnomical shifting
                services.
              </Typography>
              <NavigationLink href="https://play.google.com/store/apps/details?id=in.keyvendors.app" underline="none">
               <ImageWithFallback alt="Play Store" loading="lazy" width="180" height="60" src="https://www.keyvendors.com/public/images/googlePlay.png" />
              </NavigationLink>
            </Item>
          </Grid>
          <Grid item lg={2} xs={4}>
            <Item>
              <Typography variant="h6" align="left" gutterBottom>
                Company
              </Typography>
              <NavigationLink href="/about" underline="none">
                About Us
              </NavigationLink>
              <NavigationLink href="/contact-us" underline="none">
                Contact Us
              </NavigationLink>
              <NavigationLink href="/blog" underline="none">
                Blog
              </NavigationLink>
              <NavigationLink
                href={`${process.env.CDN_URL}/partner`}
                underline="none">
                Join as a Partner
              </NavigationLink>
              <NavigationLink href="/terms" underline="none">
                Terms and Conitions
              </NavigationLink>
              <NavigationLink href="/privacy-policy" underline="none">
                Privacy Policy
              </NavigationLink>
            </Item>
          </Grid>
          <Grid item lg={2} xs={4}>
            <Item>
              <Typography variant="h6" align="left" gutterBottom>
                Other Pages
              </Typography>
              <NavigationLink href="/how-it-works" underline="none">
                How we works
              </NavigationLink>
              <NavigationLink href="/media-room" underline="none">
                Media Room
              </NavigationLink>
              <NavigationLink href="/partner-help-center" underline="none">
                Partner Help Center
              </NavigationLink>
              <NavigationLink href="/sitemap" underline="none">
                Site Map
              </NavigationLink>        
            </Item>
          </Grid>
          <Grid item lg={2} xs={4}>
            <Item>
              <Typography variant="h6" align="left" gutterBottom>
                Service City
              </Typography>
              {data &&
                data.data.map((city, index) => (
                  <NavigationLink
                    key={index}
                    href={`/${city.slug}`}
                    onClick={(e) => goToLocationPage(e, city.slug)}
                    underline="none">
                    {city.title}
                  </NavigationLink>
                ))}
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ bgcolor: "secondary.footerBG", p: 2 }}>
        <Copyright />
      </Box>
    </>
  );
}
