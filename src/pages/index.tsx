import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { PRestTable } from "@postgresrest/node";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "~/components/Layout";
import { getDatabaseScheme, prestAPI } from "~/lib/prest";

export type Props = {
  tables: PRestTable[];
};

export const Home: React.FC<Props> = ({ tables = [] }) => (
  <Layout>
    <List>
      {tables.length > 0 ? (
        tables.map(({ name }) => (
          <Link key={name} href={`/${name}`} passHref>
            <ListItem button component="a">
              {name}
            </ListItem>
          </Link>
        ))
      ) : (
        <ListItem> Do not found any Tables </ListItem>
      )}
    </List>
  </Layout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const tables = await prestAPI.tablesByDBInSchema(getDatabaseScheme);
  return { props: { tables } };
};

export default Home;
