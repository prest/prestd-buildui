import { library } from "@fortawesome/fontawesome-svg-core";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { PRestTable } from "@postgresrest/node";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "~/components/Layout";
import { prestAPI } from "~/lib/prest";

export type Props = {
  tables: PRestTable[];
};
library.add(faTable);
export const SchemePage: React.FC<Props> = ({ tables = [] }) => {
  const router = useRouter();
  return (
    <Layout>
      <List>
        {tables.length > 0 ? (
          tables.map(({ name }) => (
            <Link
              key={name}
              href={`${router?.asPath ? router.asPath : ""}/${name}`}
              passHref
            >
              <ListItem button component="a">
                <FontAwesomeIcon icon="table" /> {name}
              </ListItem>
            </Link>
          ))
        ) : (
          <ListItem> Do not found any Schemes </ListItem>
        )}
      </List>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const fullSchemeName = `${ctx.params?.database}.${ctx.params?.scheme}`;
  const tables = await prestAPI.tablesByDBInSchema(fullSchemeName);
  return { props: { tables } };
};

export default SchemePage;
