import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Title from "components/style/Title";
import ShadowTitle from "components/style/ShadowTitle";
import whyChoose from "public/assets/images/whychooseus.png";
import qualityIcon from "public/assets/qualityIcon.jpg";
import conivenceIcon from "public/assets/connivenceIcon.jpg";
import satisfyIcon from "public/assets/satisfyIcon.jpg";
import flexiIcon from "public/assets/flexiIcon.jpg";
import Image from "next/image";
import  ContentBox  from "components/style/ContentBox";
export default function WhyUs() {
  return (
    <ContentBox title="Why Choose Us" shadowTitle="Why Choose Us" sx={{ paddingBottom : "30px"}} >
      <Grid container spacing={2}>
        <Grid lg={7} xs={12} item>
          <Box className="columnDirection" sx={{ pb: 3 }}>
            <Image src={qualityIcon} alt="Why Choose Us" />
            <Box sx={{ pl: 2 }}>
              <Typography variant="h6" align="left" gutterBottom>
                Quality
              </Typography>
              <Typography variant="body">
                Best certified technician will perform your service which is of
                highest quality.
              </Typography>
            </Box>
          </Box>
          <Box className="columnDirection" sx={{ pb: 3 }}>
            <Image src={conivenceIcon} alt="Why Choose Us" />
            <Box sx={{ pl: 2 }}>
              <Typography variant="h6" align="left" gutterBottom>
                Convenience
              </Typography>
              <Typography variant="body">
                We work based on your availability to match your routine life
                activities hassle-free.
              </Typography>
            </Box>
          </Box>
          <Box className="columnDirection" sx={{ pb: 3 }}>
            <Image src={satisfyIcon} alt="Why Choose Us" />
            <Box sx={{ pl: 2 }}>
              <Typography variant="h6" align="left" gutterBottom>
                100% Statisfaction
              </Typography>
              <Typography variant="body">
                Get 100% guaranteed satisfaction and effective resukts with a
                low budget and complete Privacy.
              </Typography>
            </Box>
          </Box>
          <Box className="columnDirection" sx={{ pb: 3 }}>
            <Image src={flexiIcon} alt="Why Choose Us" />
            <Box sx={{ pl: 2 }}>
              <Typography variant="h6" align="left" gutterBottom>
                Flexi Price for Home service
              </Typography>
              <Typography variant="body">
                We are here to get you the best price. you name it,we will
                makethe best effort to match.
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid lg={5} xs={12} align="center" item>
          <Image src={whyChoose}  width={340} alt="Why Choose Us" />
        </Grid>
        <Grid lg={12} xs={12} align="center" item>
          <Button
            sx={{ borderRadius: 29, width: 250 }}
            className="primary-btn"
            size="large"
            href="/why-choose-us"
            variant="contained">
            Read More
          </Button>
        </Grid>
      </Grid>
    </ContentBox>
  );
}
