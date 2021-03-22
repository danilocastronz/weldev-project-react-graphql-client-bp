import React, { FC, ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textTransform: "uppercase",
    },
  })
);

const PageTitle: FC<{ title: String }> = ({ title }): ReactElement => {
  const classes = useStyles();
  return (
    <Typography variant="h5" className={classes.title} color="textSecondary" gutterBottom>
      {title}
    </Typography>
  );
};

export default PageTitle;
