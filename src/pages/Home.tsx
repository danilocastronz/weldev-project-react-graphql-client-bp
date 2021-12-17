import { Helmet } from "react-helmet";
import { Typography, Link } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { PageTitle } from "../components/PageTitle";

import { APP_TITLE, PAGE_TITLE_HOME } from "../utils/constants";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
  })
);

export const HomePage = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <PageTitle title={`React GraphQL Boilerplate App`} />
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is a React application template built using TypeScript, GraphQL,
          Material-UI and React Router.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" gutterBottom>
          This has the purpose of providing the developers with a good start
          point when building React applications that consumes GraphQL APIs.
        </Typography>
        <Typography variant="body1" gutterBottom>
          It comes out-of-the-box with the Apollo Client setup and an example of
          fetching data from a GraphQL API. Also, the app has been built with a
          clear structure of folders, according to my personal point of view.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The GraphQL client setup can obviously change according to your
          requirements, however, here we show a configuration that is simple but
          good enough to start.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Other Examples
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`Not exactly what you are after? Check out more boilerplate apps
          available on my `}
          <Link href="https://github.com/danilocastronz?tab=repositories">
            GitHub repositories
          </Link>
        </Typography>
      </div>
    </>
  );
};
