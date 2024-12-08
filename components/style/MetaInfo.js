import Head from "next/head";
import * as React from "react";

const RawHtml = ({ html = "" }) => (
  <script dangerouslySetInnerHTML={{ __html: `</script>${html}<script>` }} />
);

export function MetaInfo({ metaInfo }) {
  const { title, keyword, description, setting, other_meta_tags, can_tag } =
    metaInfo;
  const canonical_url = can_tag
    ? can_tag
    : setting && setting.canonicalUrl
    ? setting.canonicalUrl
    : "";
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="keyword" content={keyword} />
      <meta name="description" content={description} />
      {other_meta_tags && <RawHtml html={other_meta_tags} sx={{ bottom: { md: 10 } }}></RawHtml>}
      {setting && <RawHtml html={setting.header_code}></RawHtml>}
      {canonical_url && (
        <link rel="canonical" href={canonical_url} key="canonical" />
      )}
 
    </Head>
  );
}
