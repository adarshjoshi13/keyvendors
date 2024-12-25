import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import ShadowTitle from "components/style/ShadowTitle";
import Title from "components/style/Title";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import ImageWithFallback from "components/style/ImageWithFallback";
export default function Reviews({ title = "Customer Reviews", list }) {

  return (
    <Box sx={{ paddingBottom : "30px", padding:{xs:"10px",sm:"10px",md:"30px"}}}>
      <ShadowTitle title="Our Reviews" />
      <Title title={title} />
      <Grid container spacing={2}>
        {list.map((card,index) => (
          <Grid item key={index} xs={12} sm={12} md={6} lg={6}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                minHeight: { lg: "10rem", md: "10rem", sm: "auto", xs: "auto" },
                justifyContent: "start",
                background: "linear-gradient(135deg, #f5f7fa, #e4e7eb)",
                boxShadow: 3,
                borderRadius: "8px",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
            <CardHeader
              sx={{ textTransform: "capitalize" }}
              avatar={
                <Avatar
                  aria-label="review"
                  sx={{
                    border: "2px solid #f5f5f5",
                    boxShadow: 1,
                    width: 40,
                    height: 40,
                  }}
                >
                  <ImageWithFallback
                    fallbackSrc={"/assets/images/userdefault.webp"}
                    src={card.image}
                    alt={card.name}
                    width={40}
                    height={40}
                  />
                </Avatar>
              }
              title={card.name}
              subheader={
                <Typography
                  component="div"
                  sx={{ color: "#6c757d", fontSize: 12, marginBottom: 1 }}
                >
                  Reviewed on {card.reviewed_on}
                </Typography>
              }
            />
            <CardContent
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Rating
                name="rating"
                defaultValue={parseInt(card.rating)}
                size="medium"
                readOnly
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: "#FFD700",
                  },
                }}
              />
              <Typography component={"div"} noWrap>
                {card.created_at}
              </Typography>
              <Typography
                  component={"div"}
                  sx={{
                    fontSize: 14,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#343a40",
                  }}
                >
                  {card.body}
              </Typography>
            </CardContent>
          </Card>
        </Grid>        
        ))}
      </Grid>
    </Box>
  );
}
