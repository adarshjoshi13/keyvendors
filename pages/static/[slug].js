import * as React from "react";
import Layout from "components/style/Layout";
import { HeroHeader } from "components/style/HeroHeader";
import { fetchData } from "services/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import about from "public/assets/images/about.png";
import aboutRepaire from "public/assets/images/aboutRepaire.jpeg";
import aboutRepaireac from "public/assets/images/aboutRepaireac.jpeg";
import Image from "next/image";

export const getStaticPaths = async () => {
  const res = await fetchData(`pages`);
  return {
    paths: res.data.map((page) => ({ params: { slug: page.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const page = await fetchData(`page/${context.params.slug}`);

  if (page.status === 500) {
    return {
      notFound: true,
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
};

// Utility function to highlight specific words
const highlightText = (text, wordsToHighlight) => {
  const regex = new RegExp(`\\b(${wordsToHighlight.join("|")})\\b`, "gi");
  return text.replace(regex, (match) => `<span style="color: #ff5722; font-weight: bold;">${match}</span>`);
};

const splitContentIntoSections = (body, phrases) => {
  const sections = [];
  let lastIndex = 0;
  const images = [about, aboutRepaire, aboutRepaireac];
  phrases.forEach((phrase, index) => {
    const phraseIndex = body.indexOf(phrase, lastIndex);
    if (phraseIndex !== -1) {
      if (phraseIndex > lastIndex) {
        sections.push({ title: null, content: body.slice(lastIndex, phraseIndex), image: null });
      }
      const nextPhraseIndex =
        index < phrases.length - 1
          ? body.indexOf(phrases[index + 1], phraseIndex)
          : body.length;

      let content = body.slice(phraseIndex + phrase.length, nextPhraseIndex);

      // Truncate after "Our Products and Services" for the first content section only
      const truncateIndex = content.indexOf("Our Products and Services");
      content = truncateIndex !== -1 ? content.slice(0, truncateIndex) : content;

      sections.push({
        title: phrase,
        content,
        image: images[index % images.length],
      });
      lastIndex = nextPhraseIndex;
    }
  });

  if (lastIndex < body.length) {
    sections.push({ title: null, content: body.slice(lastIndex), image: null });
  }

  return sections;
};

export default function StaticPage({ page, title }) {
  const phrases = [
    "Accurate Place to work with",
    "Who We Are…",
    "Our Products and Services",
    "CONNECTION TOOLS",
    "HOW IT WORKS:",
  ];

  // Map phrases to images
  const phraseImages = {
    "Accurate Place to work with": about,
    "Who We Are…": about,
    "Our Products and Services": about,
    "CONNECTION TOOLS": about,
    "HOW IT WORKS:": about,
  };

  const sections = page && page.body ? splitContentIntoSections(page.body, phrases) : [];

  const wordsToHighlight = ["Accurate", "Who", "Our", "CONNECTION", "HOW"];

  return (
    <Layout>
      <HeroHeader title={page ? page.title : title}/>
      <Grid container spacing={2} sx={{ px: { xs: 2, sm: 4, md: 15 }, mt:1 }}>
        {sections.length > 0
          ? sections.map((section, index) => (
              <React.Fragment key={index}>
                {index % 2 === 1 ? (
                  <>
                    <Grid item xs={12} md={6}>
                      {section.title && (
                        <h3
                          style={{
                            textAlign: "end",
                            paddingRight: "10px", // Reduce padding here
                            fontSize: "1.5rem",
                          }}
                        >
                          {section.title}
                        </h3>
                      )}
                      {section.image && (
                        <Box>
                          <Image
                            src={section.image}
                            alt={section.title || "Section Image"}
                            style={{
                              width: "100%",
                              height: "auto",
                              marginBottom: "1rem",
                              borderRadius: "30px", // Kept for styling
                            }}
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: highlightText(section.content, wordsToHighlight),
                        }}
                        sx={{
                          textAlign: "justify",
                          lineHeight: "1.5", // Tighter line spacing
                          fontSize: "1rem",
                        }}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} md={6}>
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: highlightText(section.content, wordsToHighlight),
                        }}
                        sx={{
                          textAlign: "justify",
                          lineHeight: "1.5",
                          fontSize: "1rem",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {section.title && (
                        <h3
                          style={{
                            textAlign: "end",
                            paddingRight: "10px", // Reduce padding here
                            fontSize: "1.5rem",
                          }}
                        >
                          {section.title}
                        </h3>
                      )}
                      {section.image && (
                        <Box>
                          <Image
                            src={section.image}
                            alt={section.title || "Section Image"}
                            style={{
                              width: "100%",
                              height: "auto",
                              marginBottom: "1rem",
                              borderRadius: "30px",
                            }}
                          />
                        </Box>
                      )}
                    </Grid>
                  </>
                )
                }
              </React.Fragment>
            ))
          : "Content Coming Soon"}
      </Grid>
    </Layout>
  );  
}
