import { memo } from "react";
import { useRouter } from "next/router";
import { Box, Link } from "@mui/material";
import Image from "next/image";
import { getServiceUrl } from "utils/utility";
import { useLocation } from "utils/hooks"; // Ensure this works correctly in Next.js

const ServicesMenu = ({ items = [] }) => {
  const location = useLocation(); // Ensure it's valid
  const router = useRouter();

  // Ensure `items` is always an array and sort safely
  const sortedItems = Array.isArray(items)
    ? [...items].sort((a, b) => (a.children?.length || 0) - (b.children?.length || 0))
    : [];
    console.log(sortedItems, 'sortedItems');
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr", // Single column for extra-small screens
          sm: "repeat(2, 1fr)", // Two columns for small screens
          md: "repeat(3, 1fr)", // Three columns for medium and larger screens
        },
        gap: 2, // Consistent spacing between cards
        p: 2, // Padding around the grid
      }}
    >
      {sortedItems
        .filter((item) => item.children?.length > 0) // Ensure children exist
        .map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ddd",
              borderRadius: "8px",
              p: 2,
              bgcolor: index % 3 === 1 ? "#f0f0f0" : "transparent", // Middle column color
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {/* Card Header */}
            <h5
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
                fontSize: "18px",
                color: "red",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              {item.icon && (
                <Image
                  src={item.icon || "/default-icon.png"} // Default image fallback
                  alt={`${item.title} icon`}
                  width={20}
                  height={20}
                />
              )}
              {item.title}
            </h5>

            {/* Card Content */}
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {item.children.map((child, ind) => (
                <li key={ind} style={{ marginBottom: "8px" }}>
                  <Link
                    href={getServiceUrl(location, `${child.slug}`)}
                    style={{
                      fontSize: "14px",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        ))}
    </Box>
  );
};

export default memo(ServicesMenu);
