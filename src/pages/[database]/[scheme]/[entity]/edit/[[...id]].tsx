import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { PRestQuery, PRestTableShowItem } from "@postgresrest/node";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "~/components/Layout";
import { getDatabaseScheme, prestAPI } from "~/lib/prest";

export type Props = {
  structures: PRestTableShowItem[];
  data: AnyObject;
  entity: string;
  databaseScheme: string;
};

export const Home: React.FC<Props> = ({
  structures,
  data,
  entity,
  databaseScheme,
}) => {
  const router = useRouter();
  const [form, setForm] = useState(
    structures.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.column_name]: data[cur.column_name],
      }),
      {}
    )
  );

  const onClick = async () => {
    console.log("asjjdasjhd", databaseScheme);
    try {
      const query = new PRestQuery();
      const table = prestAPI.tableConnection(`${databaseScheme}.${entity}`);

      if (!data.id) {
        await table.create(form);
      } else {
        const { id, ...formWithoutID } = form;
        await table.update(query.eq("id", id), formWithoutID);
      }

      router.push(`/${entity}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Box
        padding={2}
        display="flex"
        flexDirection="column"
        maxWidth={500}
        paddingTop={4}
        margin="auto"
      >
        {structures.map(({ column_name, default_value }) => (
          <Box marginBottom={2} key={column_name}>
            <TextField
              style={{ width: "100%" }}
              variant="outlined"
              disabled={default_value?.indexOf("seq'::regclass)") > -1}
              label={column_name}
              value={form[column_name]}
              onChange={(e) =>
                setForm({ ...form, [column_name]: e.target.value })
              }
            />
          </Box>
        ))}
        <Button color="primary" onClick={onClick}>
          Save
        </Button>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id = [] } = ctx.params;
  const props = {
    entity: ctx.params.entity as string,
    data: {},
    structures: [],
    databaseScheme: getDatabaseScheme,
  };

  const promises = [prestAPI.show(`${getDatabaseScheme}.${ctx.params.entity}`)];

  if (id[0]) {
    const query = new PRestQuery();
    promises.push(
      prestAPI
        .tableConnection(`${getDatabaseScheme}.${ctx.params.entity}`)
        .query(query.eq("id", id))
    );
  }

  const [structureGet, dataGet] = await Promise.allSettled(promises);

  if (structureGet.status === "fulfilled") {
    props.structures = await (
      structureGet as PromiseFulfilledResult<PRestTableShowItem>
    ).value;

    if (dataGet && dataGet.status === "fulfilled") {
      props.data = await (dataGet as PromiseFulfilledResult<AnyObject>)
        .value[0];
    }
  }

  return { props };
};

export default Home;