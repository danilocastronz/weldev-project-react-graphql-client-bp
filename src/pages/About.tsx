import React, { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { Typography, Link } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_ABOUT } from "../utils/constants";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
  })
);

const AboutPage: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_ABOUT} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <PageTitle title={PAGE_TITLE_ABOUT} />
        <Typography variant="h6" gutterBottom>
          Ideas or Feedback?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please, be welcome to flick me an email on{" "}
          <Link href="mailto:technology.castro@gmail.com">
            technology.castro@gmail.com
          </Link>
          {"."}
        </Typography>
      </div>
    </>
  );
};

export default AboutPage;
