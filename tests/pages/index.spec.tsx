jest.mock("~/lib/prest");

import React from "react";
import { render, screen } from "@testing-library/react";

import prest from "~/lib/prest";
import { Home, getServerSideProps, Props } from "~/pages";

describe("components/Home", () => {
  it("should render component with props", () => {
    const table1 = { name: "table1" };
    const table2 = { name: "table2" };
    const listItemClass =
      "MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button";

    render(<Home tables={[table1, table2]} />);

    const t1El = screen.getByText(table1.name);
    const t2El = screen.getByText(table2.name);

    expect(t1El).toHaveProperty("href", `http://localhost/${table1.name}`);
    expect(t2El).toHaveProperty("href", `http://localhost/${table2.name}`);
    expect(t1El).toHaveClass(listItemClass);
    expect(t2El).toHaveClass(listItemClass);
  });

  it("should exec correctly getServerSideProps", async () => {
    const fakeTables = "fakeTables";
    (prest.tablesByDBInSchema as jest.Mock).mockResolvedValue(fakeTables);

    const { props } = (await getServerSideProps({} as Any)) as { props: Props };
    expect(props).toHaveProperty("tables", fakeTables);
  });
});
