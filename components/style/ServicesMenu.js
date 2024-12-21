import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import React, { memo } from "react";
import { useLocation } from "utils/hooks";
import { getServiceUrl } from "utils/utility";
import { validateConfig } from "next/dist/server/config-shared";

export default memo(function ServicesMenu({ items, sx }) {
  const location = useLocation();
  let customId = 0;
  return (
    <Grid
    id="services-menu-wrapper"
    sx={{
      m: 2,
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
    }}
  >
    {items &&
      items.map((item, index) =>
        
        item.children.length > 0 ? (
          customId += 1,
         
          <Grid
            id={`menu${customId}`}
            lg={3}
            md={3}
            sm={6}
            xs={12}
            key={index}
            item
            sx={{
              padding: "16px",
              backgroundColor: customId  % 2 === 1 ? "#ededed" : "#ffff",
            }}
          >
            <Box
              sx={{
                mb: 2,
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "capitalize",
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "red",
              }}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={`${item.title} icon`}
                  style={{
                    width: "20px",
                    height: "20px",
                    objectFit: "contain",
                  }}
                />
              )}
              {item.title}
            </Box>
  
            {/* Child Items */}
            {item.children.map((child, ind) => (
              <Box
                key={ind}
                sx={{
                  fontSize: "14px",
                  marginBottom: "8px", 
                  lineHeight: 1.5,
                }}
              >
                <Link
                  href={getServiceUrl(location, `${item.slug}/${child.slug}`)}
                  underline="none"
                  color="#000"
                  sx={{
                    "&:hover": {
                      color: "#007BFF",
                    },
                  }}
                >
                  {child.title}
                </Link>
              </Box>
            ))}
          </Grid>
        ) : null
      )}
  </Grid>
  );
});
