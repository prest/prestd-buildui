import React from "react";

import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import SampleComponent from "~/components/SampleComponent";

export const Home: React.FC = () => (
  <>
    <AppBar>next-ts-mui</AppBar>
    <Box padding={2}>
      <SampleComponent title="Foo Bar Sample">Something</SampleComponent>
    </Box>
  </>
);

export default Home;
