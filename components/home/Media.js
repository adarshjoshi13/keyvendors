import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Title from "components/style/Title";
import ShadowTitle from "components/style/ShadowTitle";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Slider from "react-slick";
import Carousel from "components/style/Carousel/Carousel";
import { useEffect, useRef, useState } from "react";

const cards = [1, 2, 3, 4];

export default function Media({ title, shadowTitle, content }) {
  const contentRef = useRef();
  const [mediaChild, setMediaChild] = useState([]);
  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: false,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    setMediaChild(Array.from(contentRef.current.children));
  }, []);

  return (
    <Box>
      {shadowTitle && <ShadowTitle title={shadowTitle} />}
      {title && <Title title={title} />}
      <Box sx={{ marginBottom:"50px",}}>
        <Slider className="media-slider" {...settings} >
          {mediaChild.map((child, index) => (
            <Box key={index}>
              <Card
                raised
                sx={{
                  maxWidth: 320,
                  margin: "0 auto",
                  padding: "0.1em",
                  display: "flex",
                  flexDirection: "column",
                  background: "none",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Added box-shadow
                  borderRadius: "15px", // Added border-radius

                 
                }}
              >
                <Box
                  dangerouslySetInnerHTML={{
                    __html: child.outerHTML,
                  }}
                />
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
      <Box
        sx={{ display: "none" }}
        ref={contentRef}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></Box>
    </Box>
  );
}
