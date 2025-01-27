import { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Box from "@mui/material/Box";
import ImageWithFallback from "components/style/ImageWithFallback";
import { fetchData } from "services/api";

function HeroSlider() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = (await fetchData("banners")) || { data: [] };        
        setBanners(response);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const settings = {
    infinite: true,
    speed: 5,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: true,
  };

  const width = "0";
  const height = "0";

  return (
    <Box sx={{ backgroundColor: "#FFEBEE" }}>
      {banners.length > 0 ? (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <Link key={index} href={banner.link || "/"}>
              <ImageWithFallback
                alt="Key Vendors"
                src={banner.image}
                width={width}
                height={height}
                lazyOff={false}
                layout="responsive"
              />
            </Link>
          ))}
        </Slider>
      ) : (
        <p>Loading banners...</p>
      )}
    </Box>
  );
}

export default HeroSlider;
