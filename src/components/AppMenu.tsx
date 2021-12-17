import { Fragment, useState } from "react";
import clsx from "clsx";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Icon,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  FileCopy as DefaultIcon,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";
import { useLocation } from "react-router-dom";

import { MenuItem } from "./MenuItem";

import { GetRoutes } from "../config/routes";
import RouteItem from "../model/RouteItem.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    nested: {
      marginLeft: theme.spacing(2),
    },
    selected: {
      transition: "box-shadow",
      transitionDuration: "1s",
      boxShadow: `0 0 3px ${theme.palette.primary.main}, 0 0 9px ${theme.palette.primary.main}, 0 0 11px ${theme.palette.primary.main}, 0 0 30px ${theme.palette.primary.main}`,
    },
  })
);

export const AppMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      {GetRoutes().map((route: RouteItem, index: number) => (
        <Fragment key={`menu-${route.menuID}`}>
          {route.subRoutes ? (
            <>
              <ListItem
                key={`route-item-nav-${route.menuID}`}
                button
                onClick={handleClick}
              >
                <ListItemIcon>
                  <IconButton
                    className={clsx({
                      [classes.selected]:
                        !open &&
                        route.subRoutes.some(
                          (item: RouteItem) => item.path === location.pathname
                        ),
                    })}
                    size="small"
                  >
                    <Icon component={route.icon || DefaultIcon} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary={route.title} />
                {open ? (
                  <Tooltip title="Collapse" placement="bottom">
                    <ExpandLess />
                  </Tooltip>
                ) : (
                  <Tooltip title="Expand" placement="bottom">
                    <ExpandMore />
                  </Tooltip>
                )}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List className={classes.nested}>
                  {route.subRoutes.map((sRoute: RouteItem) => (
                    <MenuItem
                      menuID={route.menuID}
                      title={sRoute.title}
                      icon={sRoute.icon}
                      tooltip={sRoute.tooltip}
                      path={sRoute.path}
                      enabled={sRoute.enabled}
                      component={sRoute.component}
                      subRoutes={sRoute.subRoutes}
                    />
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <MenuItem
              menuID={route.menuID}
              title={route.title}
              icon={route.icon}
              tooltip={route.tooltip}
              path={route.path}
              enabled={route.enabled}
              component={route.component}
              subRoutes={route.subRoutes}
            />
          )}
          {route.appendDivider && <Divider className={classes.divider} />}
        </Fragment>
      ))}
    </List>
  );
};
