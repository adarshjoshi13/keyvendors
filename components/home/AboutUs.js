import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import aboutUs from "public/assets/images/about.png";
import Image from "next/image";
import ContentBox from "components/style/ContentBox";

export default function AboutUs({ content }) {
  return (
    <ContentBox title="About Us" shadowTitle="About Us">
      <Grid direction={"row"} container>
        <Grid className="mobileCenter" lg={5} md={5} xs={12} item>
          <Image src={aboutUs} width={330} alt="About Us" />
        </Grid>
        <Grid
          item
          lg={7}
          md={7}
          xs={12}
          className="rowDirection mobileAlignItemCenter">
          <Typography
            variant="body"
            align="justify"
            sx={{ paddingTop: { xs: 2, sm: 2, md: 2 } }}
            dangerouslySetInnerHTML={{
              __html: content,
            }}></Typography>
          <Button
            sx={{ borderRadius: 29, width: 250, marginTop: 2 }}
            className="primary-btn mobileCenter"
            size="large"
            href="/about"
            variant="contained">
            Read More
          </Button>
        </Grid>
      </Grid>
    </ContentBox>
  );
}
