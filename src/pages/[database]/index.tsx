import { library } from "@fortawesome/fontawesome-svg-core";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { PRestSchema } from "@postgresrest/node";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "~/components/Layout";
import prest from "~/lib/prest";

export type Props = {
  database: string;
  schemes: PRestSchema[];
};

library.add(faLayerGroup);
export const DataDasePage: React.FC<Props> = ({ database, schemes }) => {
  return (
    <Layout>
      <List>
        {schemes.length > 0 ? (
          schemes.map(({ schema_name }) => (
            <Link
              key={database + "-" + schema_name}
              href={`/${database}/${schema_name}`}
              passHref
            >
              <ListItem button component="a">
                <FontAwesomeIcon icon="layer-group" /> {database}.
                <b>{schema_name}</b>
              </ListItem>
            </Link>
          ))
        ) : (
          <ListItem> Do not found any Database </ListItem>
        )}
      </List>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const props = {
    database: ctx.params.database as string,
    schemes: await prest.schemas(),
  };

  return { props };
};

export default DataDasePage;
