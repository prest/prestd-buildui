import React from "react";

import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Layout from "~/components/Layout";
import prest from "~/lib/prest";

import { GetServerSideProps } from "next";
import { PRestTable } from "@postgresrest/node";

export type Props = {
  tables: PRestTable[];
};

export const Home: React.FC<Props> = ({ tables = [] }) => (
  <Layout>
    <List>
      {tables.map(({ name }) => (
        <Link key={name} href={`/${name}`} passHref>
          <ListItem button component="a">
            {name}
          </ListItem>
        </Link>
      ))}
    </List>
  </Layout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const tables = await prest.tablesByDBInSchema("prest.public");
  return { props: { tables } };
};

export default Home;
