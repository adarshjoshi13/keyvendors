import dynamic from "next/dynamic";
import { Container } from "@mui/material";
import Layout from "components/style/Layout";
import HeroSlider from "components/home/HeroSlider";
import { fetchData } from "services/api";

// Dynamically Import Components (Disabling SSR for Non-Critical UI Components)
const Cta = dynamic(() => import("components/home/Cta"), { ssr: false });
const NotificationRibbon = dynamic(() => import("components/home/NotificationRibbon"), { ssr: false });
const Services = dynamic(() => import("components/home/Services"), { ssr: false });
const Media = dynamic(() => import("components/home/Media"), { ssr: false });
const Reviews = dynamic(() => import("components/home/Reviews"), { ssr: false });
const AboutUs = dynamic(() => import("components/home/AboutUs"), { ssr: false });
const WhyUs = dynamic(() => import("components/home/WhyUs"), { ssr: false });
const Process = dynamic(() => import("components/home/Process"), { ssr: false });
const TopServices = dynamic(() => import("components/home/TopServices"), { ssr: false });

/**
 * Fetch data for the home page (runs at build time or revalidates as per ISR)
 */
export const getStaticProps = async () => {
  try {
    // Fetch Services
    const servicesResponse = await fetchData("services/menu");
    const services = servicesResponse ? servicesResponse : { data: [] };
    
    // Fetch Global Settings
    const settingResponse = await fetchData("global-setting");
    const setting = settingResponse?.data ? settingResponse : { data: {} };

    // Extract Home Page Category ID
    const home_page_category_id = setting?.data?.home_page_category_id || null;

    // Fetch Blocks Data (Ensure It's Always an Object)
    const blocksResponse = await fetchData("blocks", { type: ["offer", "media-room"] });
    const blocks = blocksResponse?.data || {};

    // Ensure `process.env.HOST` is defined
    const canonicalUrl = process.env.HOST || "https://your-default-domain.com";

    // Set Meta Information
    const metaInfo = {
      title: "Get Certified Local Service Expert at your Doorstep | Keyvendors.com",
      keyword: "Keyvendors, certified local home service, waterproofing, interior designer",
      description:
        "Keyvendors is a credible marketplace for certified local home service experts including AC service, waterproofing, interior designer, RO Service in Delhi NCR",
      setting: { ...setting?.data, canonicalUrl },
    };

    return {
      props: {
        services,
        home_page_category_id,
        metaInfo,
        setting,
        blocks,
      },
      revalidate: 60, // ISR: Regenerate page every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching data in getStaticProps:", error);

    return {
      props: {
        services: { data: [] },
        home_page_category_id: null,
        metaInfo: {
          title: "Get Certified Local Service Expert at your Doorstep | Keyvendors.com",
          keyword: "Keyvendors, certified local home service, waterproofing, interior designer",
          description:
            "Keyvendors is a credible marketplace for certified local home service experts including AC service, waterproofing, interior designer, RO Service in Delhi NCR",
          setting: { canonicalUrl: process.env.HOST || "https://your-default-domain.com" },
        },
        setting: { data: {} },
        blocks: {},
      },
      revalidate: 60,
    };
  }
};

export default function IndexPage({ services, home_page_category_id, blocks }) {
  return (
    <div className="smal-mobile">
      <Layout megaMenuList={services}>
        <HeroSlider />
        <Cta featuredServices={services?.data?.filter((service) => parseInt(service.featured) === 1) || []} />
        <NotificationRibbon />

        {/* Offers Section */}
        {blocks?.offer && (
          <Container sx={containerStyle} maxWidth="lg">
            <Media title="Our Offers" shadowTitle="Our Offers" content={blocks.offer.content} />
          </Container>
        )}

        {/* Services Section */}
        <Container sx={containerStyle} maxWidth="lg">
          <Services services={services} />
        </Container>

        {/* About Us Section */}
        <Container sx={containerStyle} maxWidth="lg">
          <AboutUs />
        </Container>

        {/* Why Us Section */}
        <Container sx={containerStyle} maxWidth="lg">
          <WhyUs />
        </Container>

        {/* Process and Top Services Section */}
        <Container sx={containerStyle} maxWidth="lg">
          <Process services={home_page_category_id} />
          <TopServices title="Top Services" home_page_category_id={home_page_category_id} />
        </Container>

        {/* Reviews Section */}
        <Container sx={{ ...containerStyle, background: "#fbfbfb" }} maxWidth="lg">
          <Reviews />
        </Container>

        {/* Media Room Section */}
        {blocks?.["media-room"] && (
          <Container sx={containerStyle} maxWidth="lg">
            <Media title="Our Media & Awards" shadowTitle="Media & Awards" content={blocks["media-room"].content} />
          </Container>
        )}
      </Layout>
    </div>
  );
}

// Centralized Container Styling
const containerStyle = {
  pb: 5,
  margin: "0 auto",
  padding: "0.1em",
  display: "flex",
  flexDirection: "column",
  background: "#ffff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "15px",
  marginTop: "40px",
};
