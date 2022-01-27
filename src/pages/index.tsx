import { library } from "@fortawesome/fontawesome-svg-core";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { PRestDatabase } from "@postgresrest/node";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "~/components/Layout";
import { prestAPI } from "~/lib/prest";

export type Props = {
  dbs: PRestDatabase[];
};

library.add(faDatabase);
export const Databases: React.FC<Props> = ({ dbs = [] }) => (
  <Layout>
    <List>
      {dbs.length > 0 ? (
        dbs.map(({ datname }) => (
          <Link key={datname} href={`/${datname}`} passHref>
            <ListItem button component="a">
              <FontAwesomeIcon icon="database" /> {datname}
            </ListItem>
          </Link>
        ))
      ) : (
        <ListItem> Do not found any Database </ListItem>
      )}
    </List>
  </Layout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const dbs = await prestAPI.databases();
  return { props: { dbs } };
};

export default Databases;
