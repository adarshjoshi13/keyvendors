import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import aboutusimg from "public/assets/images/about.png";
import Image from "next/image";
import ContentBox from "components/style/ContentBox";
import { fetchData } from "services/api";

export default function AboutUs() {
  const [homeAboutUs, setHomeAboutUs] = useState(""); // Changed to string since "teaser" is a string

  useEffect(() => {
    const fetchHomeAboutUs = async () => {
      try {
        const about = (await fetchData("page/about")) || { data: { teaser: "" } };
        // const response = about.data.teaser; // Ensure `response` is declared
        setHomeAboutUs(about.data.teaser);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };
    fetchHomeAboutUs();
  }, []);

  return (
    <ContentBox title="About Us" shadowTitle="About Us" sx={{ paddingBottom: "30px" }}>
      <Grid direction={"row"} container>
        <Grid className="mobileCenter" lg={5} md={5} xs={12} item>
          <Image src={aboutusimg} width={330} alt="About Us" loading="lazy" />
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
            sx={{ padding: { xs: 2, sm: 2, md: 2 } }}
            dangerouslySetInnerHTML={{
              __html: homeAboutUs, // Populating the fetched HTML content
            }}>
          </Typography>
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
