import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      width: "100%",
      bottom: 0,
      top: theme.mixins.toolbar.minHeight,

      "@media (min-width:0px) and (orientation: landscape)": {
        top: (
          theme.mixins.toolbar[
            "@media (min-width:0px) and (orientation: landscape)"
          ] as { minHeight: number }
        ).minHeight,
      },

      "@media (min-width:600px)": {
        top: (
          theme.mixins.toolbar["@media (min-width:600px)"] as {
            minHeight: number;
          }
        ).minHeight,
      },
    },
  });

export const Layout: React.FC<WithStyles<typeof styles>> = ({
  children,
  classes,
}) => (
  <>
    <AppBar>
      <Toolbar>PRest Admin</Toolbar>
    </AppBar>
    <div className={classes.root}>{children}</div>
  </>
);

export default withStyles(styles)(Layout);
