import React from "react";
import { render, screen } from "@testing-library/react";

import SampleComponent from "~/components/SampleComponent";

describe("components/SampleComponent", () => {
  it("should render component with props", () => {
    const props = { title: "foo", children: "bar" };
    render(<SampleComponent {...props} />);

    expect(screen.getByText(props.title)).toHaveClass("MuiCardHeader-title");
    expect(screen.getByText(props.children)).toHaveClass("MuiCardContent-root");
  });
});
