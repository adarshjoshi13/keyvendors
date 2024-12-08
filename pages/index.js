import * as React from "react";
import Container from "@mui/material/Container";
import Layout from "components/style/Layout";

import HeroSlider from "components/home/HeroSlider";
import Cta from "components/home/Cta";
import Services from "components/home/Services";
import NotificationRibbon from "components/home/NotificationRibbon";
import WhyUs from "components/home/WhyUs";
import Media from "components/home/Media";
import Reviews from "components/home/Reviews";
import AboutUs from "components/home/AboutUs";

import Process from "components/home/Process";
import { fetchData } from "services/api";
import TopServices from "components/home/TopServices";
import 'bootstrap/dist/css/bootstrap.min.css';

export const getStaticProps = async () => {
  const banners = await fetchData(`banners`);
  const testimonials = await fetchData(`testimonials`);
  const services = await fetchData(`services/menu`);
  const about = await fetchData(`page/about`);
  const setting = await fetchData(`global-setting`);
  const home_page_category_id = setting.data.home_page_category_id;
  let selectedServices = null;

  const featuredServices = services.filter(
    (service) => parseInt(service.featured) == 1
  );

  if (home_page_category_id) {
    selectedServices = await fetchData(
      `get_sub_category?cid=${home_page_category_id}`
    );
  }
  const blocks = await fetchData(`blocks`, { type: ["offer", "media-room"] });

  const metaInfo = {
    title:
      "Get Certified Local Service Expert at your Doorstep | Keyvendors.com",
    keyword:
      "Keyvendors,certified local home service, waterproofing, interior designer,",
    description:
      "Keyvendors is a credible marketplace for certified local home service experts including AC service, waterproofing, interior designer, RO Service in Delhi NCR",
    setting: {...setting.data,canonicalUrl:`${process.env.HOST}`},
    
  };

  return {
    props: {
      banners,
      services,
      selectedServices,
      testimonials,
      featuredServices,
      metaInfo,
      about,
      setting,
      blocks,
    },
    revalidate: 60,
  };
};

export default function IndexPage({
  banners,
  services,
  selectedServices,
  testimonials,
  featuredServices,
  about,
  blocks,
}) {
  return (
    <div className="smal-mobile">
      <Layout megaMenuList={services}>
      <HeroSlider banners={banners} className="pt-0"/>
      <Cta services={featuredServices} />
      <NotificationRibbon />
      {blocks && blocks["data"]["offer"] && (
        <Container sx={{ pb: 5 }} maxWidth="lg">
          <Media
            title="Our Offers"
            shadowTitle="Our Offers"
            content={blocks["data"]["offer"]["content"]}
          />
        </Container>
      )}
      <Container sx={{ pb: 5 }} maxWidth="lg">
        <Services services={services} />
      </Container>
      {/* <ServicesStory title="Appliance Repair" services={selectedServices} /> */}
      <Container sx={{ pb: 5 }} maxWidth="lg">
        <AboutUs content={about.data.teaser} />
      </Container>
      <Container sx={{ pb: 5 }} maxWidth="lg">
        <WhyUs />
      </Container>
      <Container sx={{ pb: 5 }} maxWidth="lg">
        <Process services={selectedServices} />
        <TopServices title="Top Services" services={selectedServices} />
      </Container>
      <Container sx={{ pb: 5 }} maxWidth="lg">
        <Reviews list={testimonials} />
      </Container>
      {blocks && blocks["data"]["media-room"] && (
        <Container sx={{ pb: 5 }} maxWidth="lg">
          <Media
            title="Our Media & Awards"
            shadowTitle="Media & Awards"
            content={blocks["data"]["media-room"]["content"]}
          />
        </Container>
      )}
    </Layout>
    </div>
    
  );
}
