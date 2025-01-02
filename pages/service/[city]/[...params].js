import { useRef, useState, useEffect} from "react";
import Layout from "components/style/Layout";
import ServiceTop from "components/services/ServiceTop";
import ServiceDetail from "components/services/ServiceDetail";
import PageContainer from "components/style/PageContainer";
import { fetchData, serviceLocation } from "services/api";
import { useSelector } from "react-redux";
import { getLocation } from "store/locationSlice";

function sanitizeString(str) {
  return str
      .trim()                           // Remove leading/trailing spaces
      .replace(/[^a-zA-Z0-9\s-]/g, '')  // Remove special characters except spaces and dashes
      .replace(/\s+/g, '-')             // Replace spaces with dashes
      .toLowerCase();                   // Convert to lowercase
}

export const getServerSideProps = async (context) => {
  let params = context.params.params;
  let service = null;
  let metaInfo = null;
  let selectedService = null;
  const setting = await fetchData(`global-setting`);
  if (params.length === 2 || params.length === 1) {
    const catSlug = params.length > 1 ? params[1] : params[0];
    const serviceRs = await fetchData(`category_details/${catSlug}`);
    service = serviceRs.data;
    if (serviceRs.status === 500) {
      return {
        notFound: true, //redirects to 404 page
      };
    } else {
      if (service.parent_cid > 0 && params.length == 1) {
        return {
          redirect: {
            destination: `/service/${context.query.city}/${service.parent.slug}/${service.slug}`,
            permanent: true,
          },
        };
      }
    }

    selectedService = service.children.length ? service.children[0].slug : null;

    if (params[1]) {
      if (service.children.some((child) => child.slug === params[1])) {
        selectedService = params[1];
      }
    }

    metaInfo = {
      title: service.title,
      keyword: service.meta_keyword,
      description: service.meta_description,
      setting: { ...setting.data },
    };
  } else {
    return {
      notFound: true, //redirects to 404 page
    };
  }
  return {
    props: {
      service,
      selectedService,
      metaInfo,
    },
  };
};

export default function ServicesPage({ service, metaInfo,selectedService }) {
  const detailRef = useRef(null);
  let serviceMetaDetails = null;
  const location = useSelector(getLocation);
  const [serviceDetails, setServiceLocationDetails] = useState();
  const serviceLocationDetails = async (context) => {
    try {              
      const current_location = location ? location.locality : "Delhi/NCR";
      let title = service.title;
      const sanitizedTitle = sanitizeString(title);            // Sanitize title
      const sanitizedLocation = sanitizeString(current_location); // Sanitize location
      const res_service_location = await serviceLocation(`service-location/${sanitizedTitle}-${sanitizedLocation}`);
      const res_location_details = res_service_location.data;
      if (res_service_location.status === 500) {
        setServiceLocationDetails();
      } else {
        setServiceLocationDetails(res_location_details);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
      serviceLocationDetails();
  }, []);

  if(serviceDetails){
    serviceMetaDetails = serviceDetails;
  }
  return (
    <Layout>
      <PageContainer>
        <ServiceTop
          service={service}
          scrollToRef={detailRef}
          metaInfo={metaInfo}
          titleWithLocation={true}
          serviceMetaDetails = {serviceMetaDetails}
        />
        <ServiceDetail
          refProp={detailRef}
          service={service}
          selectedService={selectedService}
          serviceMetaDetails = {serviceMetaDetails}
        />
      </PageContainer>
    </Layout>
  );
}
