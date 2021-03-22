import React, { ReactElement, useReducer, FC } from "react";
import {
  createMuiTheme,
  Theme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
// graphql client
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";

// components
import Layout from "./components/Layout";

// theme
import { lightTheme, darkTheme } from "./theme/appTheme";

// app routes
import routes from "./config/routes";

// constants
import { APP_TITLE } from "./utils/constants";

// interfaces
import RouteItem from "./model/RouteItem.model";

// define app context
const AppContext = React.createContext(null);

// default component
const DefaultComponent: FC<{}> = (): ReactElement => (
  <div>{`No Component Defined.`}</div>
);

function App() {
  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);

  // define custom theme
  let theme: Theme = createMuiTheme(useDefaultTheme ? lightTheme : darkTheme);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      {/* graphql client */}
      <ApolloProvider client={client}>
        {/* react context api */}
        <AppContext.Provider value={null}>
          {/* material ui theme */}
          <ThemeProvider theme={theme}>
            {/* react router */}
            <Router>
              <Switch>
                {/* app layout */}
                <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
                  {/* for each route config, a react route is created */}
                  {routes.map((route: RouteItem) =>
                    route.subRoutes ? (
                      route.subRoutes.map((item: RouteItem) => (
                        <Route
                          key={`${item.menuId}`}
                          path={`${item.path}`}
                          component={item.component || DefaultComponent}
                          exact
                        />
                      ))
                    ) : (
                        <Route
                          key={`${route.menuId}`}
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
        </AppContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
