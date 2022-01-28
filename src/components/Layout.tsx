import AppBar from "@material-ui/core/AppBar";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

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

const WhiteLink = styled.a`
  color: white;
`;

export const Layout: React.FC<WithStyles<typeof styles>> = ({
  children,
  classes,
}) => (
  <>
    <AppBar>
      <Toolbar>
        <Link key="home" href="/" passHref>
          <WhiteLink>Build UI - prestd</WhiteLink>
        </Link>
      </Toolbar>
    </AppBar>
    <div className={classes.root}>{children}</div>
  </>
);

export default withStyles(styles)(Layout);
