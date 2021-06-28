import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

interface Props {
  title: string;
}

export const SampleComponent: React.FC<Props> = ({ title, children }) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>{children}</CardContent>
  </Card>
);

export default SampleComponent;
