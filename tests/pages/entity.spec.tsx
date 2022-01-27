jest.mock("~/lib/prest");

import { PRestTableShowItem } from "@postgresrest/node";
import { render, screen } from "@testing-library/react";
import React from "react";
import { prestAPI } from "~/lib/prest";
import {
  EntityPage,
  getServerSideProps,
  Props
} from "~/pages/[database]/[scheme]/[entity]";

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

    const fullTableName = `prest.public.${entity}`;

    render(
      <EntityPage
        structure={stucture}
        items={items}
        fullTableName={fullTableName}
      />
    );

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
    const fakeCtx = {
      params: {
        database: "prest",
        scheme: "public",
        entity: "foobar",
      },
    };
    (prestAPI.tablesByDBInSchema as jest.Mock).mockResolvedValue(fakeTables);
    (prestAPI.show as jest.Mock).mockResolvedValue(fakeStructure);

    const { props } = (await getServerSideProps(fakeCtx as Any)) as {
      props: Props;
    };

    const fullTableName = `${fakeCtx.params.database}.${fakeCtx.params.scheme}.${fakeCtx.params.entity}`;
    expect(props).toHaveProperty("fullTableName", fullTableName);
    expect(props).toHaveProperty("structure", fakeStructure);
    expect(props).toHaveProperty("items", fakeTables);
  });
});
