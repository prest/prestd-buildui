import { Badge } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Delete";
import { PRestQuery, PRestTableShowItem } from "@postgresrest/node";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "~/components/Layout";
import { getDatabaseScheme, prestAPI } from "~/lib/prest";

export type Props = {
  items: AnyObject[];
  structure: PRestTableShowItem[];
  entity: string;
  databaseScheme: string;
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),

    "& > *": {
      marginLeft: theme.spacing(2),
    },
  },
  table: {
    width: "100%",
    height: `calc(100vh - ${
      (theme.mixins.toolbar.minHeight as number) + 80
    }px)`,
    padding: theme.spacing(2),

    "@media (min-width:0px) and (orientation: landscape)": {
      height: `calc(100vh - ${
        ((
          theme.mixins.toolbar[
            "@media (min-width:0px) and (orientation: landscape)"
          ] as typeof theme.mixins.toolbar
        ).minHeight as number) + 80
      }px`,
    },

    "@media (min-width:600px)": {
      height: `calc(100vh - ${
        ((
          theme.mixins.toolbar[
            "@media (min-width:600px)"
          ] as typeof theme.mixins.toolbar
        ).minHeight as number) + 80
      }px`,
    },
  },
}));

export const EntityPage: React.FC<Props> = ({
  items,
  structure,
  entity,
  databaseScheme,
}) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const classes = useStyles();
  const router = useRouter();
  const columns: GridColDef[] = structure.map(({ column_name }) => ({
    field: column_name,
    flex: 1,
  }));

  const handleSelectionModelChange = (newSelection) =>
    setSelectionModel(newSelection.selectionModel);

  const deleteRows = async () => {
    const query = new PRestQuery();
    await prestAPI
      .tableConnection(`${databaseScheme}.${entity}`)
      .delete(query.in("id", selectionModel));
  };

  return (
    <Layout>
      <div className={classes.table}>
        <DataGrid
          rows={items}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={handleSelectionModelChange}
          onRowClick={({ id }) => router.push(`${router.asPath}/edit/${id}`)}
        />
      </div>
      <div className={classes.fab}>
        {selectionModel?.length === 0 ? null : (
          <Badge color="error" badgeContent={selectionModel.length}>
            <Fab color="secondary" aria-label="remove" onClick={deleteRows}>
              <RemoveIcon />
            </Fab>
          </Badge>
        )}
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => router.push(`/${entity}/edit`)}
        >
          <AddIcon />
        </Fab>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const props = {
    entity: ctx.params.entity as string,
    items: [],
    structure: [],
    databaseScheme: getDatabaseScheme,
  };
  const [entityGet, structureGet] = await Promise.allSettled([
    prestAPI.tablesByDBInSchema(`${getDatabaseScheme}.${ctx.params.entity}`),
    prestAPI.show(`${getDatabaseScheme}.${ctx.params.entity}`),
  ]);

  if (entityGet.status === "fulfilled" && structureGet.status === "fulfilled") {
    props.items = (entityGet as PromiseFulfilledResult<AnyObject>).value;
    props.structure = (structureGet as PromiseFulfilledResult<AnyObject>).value;
  }

  return { props };
};

export default EntityPage;
