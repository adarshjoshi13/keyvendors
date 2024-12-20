import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
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
          <Grid item key={index} xs={12} sm={12} md={6} lg={6} >
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                minHeight: {lg:"10rem",md:"10rem",sm:"auto",xs:"auto"},                
                justifyContent:"start"
              }}>
              <CardHeader
              sx={{ textTransform:"capitalize" }}
                avatar={
                  <Avatar aria-label="review">
                    <ImageWithFallback
                      fallbackSrc={"/assets/images/userdefault.webp"}                     
                      src={card.image}
                      alt={card.name}
                      width={30}
                      height={30}
                    />
                  </Avatar>
                }
                title={card.name}
                subheader={`Reviewed on ${card.reviewed_on}`}
              />
              <CardContent>
                <Rating
                  name="rating"
                  defaultValue={parseInt(card.rating)}
                  size="small"
                  color="red"
                  sx={{
                    "& .MuiSvgIcon-root": {
                      color: "Yellow",
                    }                   
                  }}
                  readOnly
                />
                <Typography component={"div"} noWrap>{card.created_at}</Typography>
                <Typography component={"div"} sx={{ fontSize: 14 ,  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",}} >
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
