import React from "react";
import { render, screen } from "@testing-library/react";

import Layout from "~/components/Layout";

describe("components/Layout", () => {
  it("should render component with props", () => {
    const children = "my test";
    render(<Layout children={children} />);

    expect(screen.getByText(children)).toHaveClass("Layout-root-1");
  });
});
