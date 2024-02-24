import Blog from "../Blog";
import "@testing-library/jest-dom";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";

// Create blog component
const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
};

// Firest test to check if the component is rendered
test("render content", () => {
  // Render blog component
  render(<Blog blog={blog} />);

  // We use the object screen to access the rendered component
  const titleElement = screen.getByText("React patterns");
  // It searches for the content in the component
  expect(titleElement).toBeDefined();
});

