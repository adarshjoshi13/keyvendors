import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Title from "components/style/Title";
import Slider from "react-slick";
import ImageWithFallback from "components/style/ImageWithFallback";
import ShadowTitle from "components/style/ShadowTitle";
import Link from "next/link";
import { getServiceLink } from "utils/utility";
import { useLocation } from "utils/hooks";
import { fetchData } from "services/api";

export default function TopServices({ title, home_page_category_id }) {
  const [homePageServices, setHomePageServices] = useState([]);
    useEffect(() => {
      const fetchHomePageServices = async () => {
        try {
          if (home_page_category_id) {
            const response = (await fetchData(`get_sub_category?cid=${home_page_category_id}`)) || { data: [],};
            setHomePageServices(response);
          }
          
        } catch (error) {
          console.error("Error fetching banners:", error);
        }
      };
  
      fetchHomePageServices();
    }, []);
  const location = useLocation();

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
  return (
    <Box sx={{ paddingBottom : "30px"}} className="topservicess">
      {(title && homePageServices) && (
        <>
          <ShadowTitle title={title} />
          <Title title={title} />
        </>
      )}
      {homePageServices && (
        <Slider {...settings}>
          {homePageServices.map((card, index) => (
            <Box key={index}>
              <Card
                raised
                sx={{
                  maxWidth: 520,
                  margin: "0 auto",
                  padding: "0.1em",
                  display: "flex",
                  flexDirection: "column",
                  background: "none",
                  boxShadow: "none",
                  borderRadius: "10px",
                }}>
                <Link href={getServiceLink(card,location)}>
                  <ImageWithFallback
                    src={card.image}
                    alt={card.title}
                    height="400"
                    width="700"
                  />
                </Link>
              </Card>
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
}
