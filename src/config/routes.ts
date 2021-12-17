import {
  Home as HomeIcon,
  CodeRounded as CodeIcon,
  EuroRounded as CurrencyIcon,
} from "@material-ui/icons";

import { HomePage } from "../pages/Home";
import { CurrencyPage } from "../pages/GraphQLApi/Currency";

import RouteItem from "../model/RouteItem.model";

/**
 * @description Define the routes of the application
 */
export const GetRoutes = (): RouteItem[] => [
  {
    menuID: "router-home",
    title: "Home",
    tooltip: "Home",
    path: "/",
    enabled: true,
    component: HomePage,
    icon: HomeIcon,
    appendDivider: true,
  },
  {
    menuID: "router-graphql-api",
    title: "GraphQL API",
    tooltip: "GraphQL API Examples",
    enabled: true,
    icon: CodeIcon,
    appendDivider: true,
    subRoutes: [
      {
        menuID: "router-graphql-api-currency",
        title: "Currency",
        tooltip: "API Example",
        path: "/graphqlapi/currency",
        enabled: true,
        component: CurrencyPage,
        icon: CurrencyIcon,
      },
    ],
  },
];
