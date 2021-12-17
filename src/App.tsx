import { ApolloProvider } from "@apollo/client";
import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useReducer } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout } from "./components/Layout";

import client from "./config/apolloClient";
import { GetRoutes } from "./config/routes";
import RouteItem from "./model/RouteItem.model";
import { darkTheme, lightTheme } from "./theme/appTheme";
import { APP_TITLE } from "./utils/constants";

const DefaultComponent = () => <>No Component Defined.</>;

function App() {
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);

  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
                {GetRoutes().map((route: RouteItem) =>
                  route.subRoutes ? (
                    route.subRoutes.map((item: RouteItem) => (
                      <Route
                        key={`${item.menuID}`}
                        path={`${item.path}`}
                        component={item.component || DefaultComponent}
                        exact
                      />
                    ))
                  ) : (
                    <Route
                      key={`${route.menuID}`}
                      path={`${route.path}`}
                      component={route.component || DefaultComponent}
                      exact
                    />
                  )
                )}
              </Layout>
            </Switch>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
