import dynamic from "next/dynamic";
import { Container } from "@mui/material";
import Layout from "components/style/Layout";
import HeroSlider from "components/home/HeroSlider";
import { fetchData } from "services/api";

// Dynamically loaded components for lazy loading
const Cta = dynamic(() => import("components/home/Cta"), { ssr: false });
const NotificationRibbon = dynamic(() => import("components/home/NotificationRibbon"), { ssr: false });
const Services = dynamic(() => import("components/home/Services"), { ssr: false });
const Media = dynamic(() => import("components/home/Media"), { ssr: false });
const Reviews = dynamic(() => import("components/home/Reviews"), { ssr: false });
const AboutUs = dynamic(() => import("components/home/AboutUs"), { ssr: false });
const WhyUs = dynamic(() => import("components/home/WhyUs"), { ssr: false });
const Process = dynamic(() => import("components/home/Process"), { ssr: false });
const TopServices = dynamic(() => import("components/home/TopServices"), { ssr: false });

export const getStaticProps = async () => {
  const banners = (await fetchData("banners")) || { data: [] };
  const testimonials = (await fetchData("testimonials")) || { data: [] };
  const services = (await fetchData("services/menu")) || { data: [] };
  const about = (await fetchData("page/about")) || { data: { teaser: "" } };
  const setting = (await fetchData("global-setting")) || { data: {} };

  const home_page_category_id = setting?.data?.home_page_category_id || null;
  let selectedServices = null;

  if (home_page_category_id) {
    selectedServices =
      (await fetchData(`get_sub_category?cid=${home_page_category_id}`)) || {
        data: [],
      };
  }

  const blocks =
    (await fetchData("blocks", { type: ["offer", "media-room"] })) || {
      data: {},
    };

  // Validate response data
  const featuredServices =
    services?.data?.filter((service) => parseInt(service.featured) === 1) || [];

  const metaInfo = {
    title:
      "Get Certified Local Service Expert at your Doorstep | Keyvendors.com",
    keyword:
      "Keyvendors,certified local home service, waterproofing, interior designer,",
    description:
      "Keyvendors is a credible marketplace for certified local home service experts including AC service, waterproofing, interior designer, RO Service in Delhi NCR",
    setting: { ...setting?.data, canonicalUrl: `${process.env.HOST}` },
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
        {/* Hero Slider */}
        <HeroSlider banners={banners} />

        {/* Featured Services Call-to-Action */}
        <Cta services={featuredServices} />

        {/* Notification Ribbon */}
        <NotificationRibbon />

        {/* Offer Block */}
        {blocks?.data?.offer && (
          <Container
            sx={{
              pb: 5,
              margin: "0 auto",
              padding: "0.1em",
              display: "flex",
              flexDirection: "column",
              background: "#ffff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "15px",
            }}
            maxWidth="lg"
          >
            <Media
              title="Our Offers"
              shadowTitle="Our Offers"
              content={blocks.data.offer.content}
            />
          </Container>
        )}

        {/* Services Section */}
        <Container
          sx={{
            pb: 5,
            margin: "0 auto",
            padding: "0.1em",
            display: "flex",
            flexDirection: "column",
            background: "#ffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            marginTop: "40px",
          }}
          maxWidth="lg"
        >
          <Services services={services} />
        </Container>

        {/* About Us Section */}
        <Container
          sx={{
            pb: 5,
            margin: "0 auto",
            padding: "0.1em",
            display: "flex",
            flexDirection: "column",
            background: "#ffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            marginTop: "40px",
          }}
          maxWidth="lg"
        >
          <AboutUs content={about.data.teaser} />
        </Container>

        {/* Why Us Section */}
        <Container
          sx={{
            pb: 5,
            margin: "0 auto",
            padding: "0.1em",
            display: "flex",
            flexDirection: "column",
            background: "#ffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            marginTop: "40px",
          }}
          maxWidth="lg"
        >
          <WhyUs />
        </Container>

        {/* Process and Top Services Section */}
        <Container
          sx={{
            pb: 5,
            margin: "0 auto",
            padding: "0.1em",
            display: "flex",
            flexDirection: "column",
            background: "#ffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            marginTop: "40px",
          }}
          maxWidth="lg"
        >
          <Process services={selectedServices} />
          <TopServices title="Top Services" services={selectedServices} />
        </Container>

        {/* Reviews Section */}
        <Container
          sx={{
            pb: 5,
            margin: "0 auto",
            padding: "0.1em",
            display: "flex",
            flexDirection: "column",
            background: "#fbfbfb",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "15px",
            marginTop: "40px",
          }}
          maxWidth="lg"
        >
          <Reviews list={testimonials} />
        </Container>

        {/* Media Room Section */}
        {blocks?.data?.["media-room"] && (
          <Container
            sx={{
              pb: 5,
              margin: "0 auto",
              padding: "0.1em",
              display: "flex",
              flexDirection: "column",
              background: "#ffff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "15px",
              marginTop: "40px",
            }}
            maxWidth="lg"
          >
            <Media
              title="Our Media & Awards"
              shadowTitle="Media & Awards"
              content={blocks.data["media-room"].content}
            />
          </Container>
        )}
      </Layout>
    </div>
  );
}
