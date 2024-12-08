import Slider from "react-slick";
import Link from 'next/link';
import Box from "@mui/material/Box";
import ImageWithFallback from "components/style/ImageWithFallback";

function HeroSlider({ banners }) {
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
    <Box sx={{ backgroundColor: "#FFEBEE"}} >
      <Slider {...settings} >
        {banners.map((banner, index) => {
          return (
            <Link key={index} href={banner.link?banner.link:"/"}>
              <ImageWithFallback                
                alt="Key Vendors"
                src={banner.image}
                width={width}
                height={height}
                lazyOff={false}
                
                layout="responsive"
              />
            </Link>
          );
        })}
      </Slider>
    </Box>
  );
}

export default HeroSlider;
