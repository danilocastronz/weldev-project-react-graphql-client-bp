import { ComponentType } from "react";

// RouteItem is an interface for defining the application routes and navigation menu items
interface RouteItem {
  menuID: string;
  title: string;
  tooltip?: string;
  path?: string;
  component?: ComponentType;
  enabled: boolean;
  icon?: ComponentType;
  subRoutes?: RouteItem[];
  appendDivider?: boolean;
}

export default RouteItem;
