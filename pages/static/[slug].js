import * as React from "react";
import Layout from "components/style/Layout";
import { HeroHeader } from "components/style/HeroHeader";
import { fetchData } from "services/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import about from "public/assets/images/about.png";
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

// Utility function to truncate text to a word limit
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "…";
  }
  return text;
};

// Utility function to highlight specific words
const highlightText = (text, wordsToHighlight) => {
  const regex = new RegExp(`\\b(${wordsToHighlight.join("|")})\\b`, "gi");
  return text.replace(regex, (match) => `<span style="color: #ff5722; font-weight: bold;">${match}</span>`);
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

  const splitContentIntoSections = (body, phrases) => {
    const sections = [];
    let lastIndex = 0;

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
        sections.push({
          title: phrase,
          content: body.slice(phraseIndex + phrase.length, nextPhraseIndex),
          image: phraseImages[phrase] || null, 
        });
        lastIndex = nextPhraseIndex;
      }
    });

    if (lastIndex < body.length) {
      sections.push({ title: null, content: body.slice(lastIndex), image: null });
    }

    return sections;
  };

  const sections = page && page.body ? splitContentIntoSections(page.body, phrases) : [];

 
  const wordsToHighlight = ["Accurate", "Who", "Our", "CONNECTION", "HOW"];

  return (
    <Layout sx={{ pb: 0 }}>
      <HeroHeader title={page ? page.title : title} />
      <Grid container spacing={4} sx={{ px: 8 }}>
        {sections.length > 0 
          ? sections.map((section, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 ? (
                <>
                  <Grid item xs={12} md={6}>
                    {section.title && (
                      <Box>
                        <h3 sx={{ textAlign: "center" }}>{section.title}</h3>
                        {section.image && (
                          <Image
                            src={section.image}
                            alt={section.title}
                            style={{
                              width: "100%",
                              height: "auto",
                              marginBottom: "1rem",
                             
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          section.content || "No content available.",
                          wordsToHighlight
                        ),
                      }}
                      sx={{ textAlign: "justify",lineHeight:"2"}}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={6}>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          section.content || "No content available.",
                          wordsToHighlight
                        ),
                      }}
                      sx={{ textAlign: "justify",lineHeight:"2"}}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {section.title && (
                      <Box>
                        <h3 sx={{ textAlign: "center" }}>{section.title}</h3>
                        {section.image && (
                          <Image
                            src={section.image}
                            alt={section.title}
                            style={{
                              width: "100%",
                              height: "auto",
                              marginBottom: "1rem",
                              paddingRight:"20px"
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </Grid>
                </>
              )}
            </React.Fragment>
          ))
        : "Content Coming Soon"}
      </Grid>
    </Layout>
  );
}
