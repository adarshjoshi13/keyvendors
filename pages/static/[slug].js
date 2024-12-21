import * as React from "react";
import Layout from "components/style/Layout";
import { HeroHeader } from "components/style/HeroHeader";
import { fetchData } from "services/api";
import Box from "@mui/material/Box";

export const getStaticPaths = async () => {
  const res = await fetchData(`pages`);
  return {
    paths: res.data.map((page) => ({ params: page })),
    fallback: 'blocking', // can also be true or 'blocking'
  };
}
export const getStaticProps = async (context) => {
  const page = await fetchData(`page/${context.params.slug}`);

  if (page.status === 500) {
    return {
      notFound: true, //redirects to 404 page
    };
  }

  const metaInfo = {
    title: page.data.title,
    keyword: page.data.seo_keyword,
    description: page.data.seo_description,
  };
  return {
    props: {
      page: page.data,
      title: context.params.slug.replace("-", " "),
      metaInfo,
    },
    revalidate: 3600,
  };
}

export default function StaticPage({ page, title }) {
  return (
    <Layout sx={{ pb: 0 }}>
      <HeroHeader title={page ? page.title : title} />
      <Box
        sx={{ px:{ xs: 2, sm: 5, md: '100px' }}}
        
        dangerouslySetInnerHTML={{
          __html: page ? page.body : "Coming Soon",
        }}
        flexWrap></Box>
    </Layout>
  );
}
