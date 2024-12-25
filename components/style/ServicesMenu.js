import React, { memo } from "react";
import { Box, Link } from "@mui/material";
import { useLocation } from "utils/hooks";
import { getServiceUrl } from "utils/utility";

export default memo(function ServicesMenu({ items }) {
  const location = useLocation();
  // Create a copy of the items array and sort it based on the count of child elements (fewer children first)
  const sortedItems = [...items].sort((a, b) => a.children.length - b.children.length);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // Three columns
        gap: "16px", // Adjust gap between cards
        padding: "16px", // Add padding around the grid
      }}
    >
      {sortedItems &&
        sortedItems
          .filter(item => item.children.length > 0) // Only show items that have children
          .map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                boxSizing: "border-box",
                backgroundColor: index % 3 === 1 ? "#f0f0f0" : "transparent", // Color for the middle column (index 1)
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for hover effect
              }}
              // Hover effect for better interactivity
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Card Header */}
              <h5
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                  fontSize: "18px", // Larger font size for parent titles
                  color: "red", // Text color red
                  textDecoration: "underline", // Underline the parent title
                  fontWeight: "bold", // Make the title bold
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
                      marginRight: "8px",
                    }}
                  />
                )}
                {item.title}
              </h5>

              {/* Card Content */}
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                }}
              >
                {item.children.map((child, ind) => (
                  <li
                    key={ind}
                    style={{
                      marginBottom: "8px", // Consistent spacing for child items
                    }}
                  >
                    <Link
                      href={getServiceUrl(location, `${child.slug}`)}
                      style={{
                        fontSize: "14px",
                        textDecoration: "none",
                        color: "inherit", // Inherit color from parent title
                      }}
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
    </div>
  );
});
