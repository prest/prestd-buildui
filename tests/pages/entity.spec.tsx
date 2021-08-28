jest.mock("~/lib/prest");

import React from "react";
import { render, screen } from "@testing-library/react";
import { PRestTableShowItem } from "@postgresrest/node";

import prest from "~/lib/prest";
import { EntityPage, getServerSideProps, Props } from "~/pages/[entity]";

describe("components/EntityPage", () => {
  it("should render component with props", () => {
    const entity = "fakeEnt";
    const stucture = [
      { column_name: "id" },
      { column_name: "col1" },
    ] as PRestTableShowItem[];

    const items = [
      { id: 1, col1: "foo" },
      { id: 2, col1: "fizz" },
    ];

    render(<EntityPage entity={entity} structure={stucture} items={items} />);

    items.forEach(({ col1, id }) => {
      expect(screen.getByText(id)).toHaveClass(
        "MuiDataGrid-cell MuiDataGrid-cell--textLeft"
      );
      expect(screen.getByText(col1)).toHaveClass(
        "MuiDataGrid-cell MuiDataGrid-cell--textLeft"
      );
    });
  });

  it("should exec correctly getServerSideProps", async () => {
    const fakeTables = "fakeTables";
    const fakeStructure = "fakeStructure";
    const fakeCtx = { params: { entity: "foobar" } };
    (prest.tablesByDBInSchema as jest.Mock).mockResolvedValue(fakeTables);
    (prest.show as jest.Mock).mockResolvedValue(fakeStructure);

    const { props } = (await getServerSideProps(fakeCtx as Any)) as {
      props: Props;
    };

    expect(props).toHaveProperty("entity", fakeCtx.params.entity);
    expect(props).toHaveProperty("structure", fakeStructure);
    expect(props).toHaveProperty("items", fakeTables);
  });
});
