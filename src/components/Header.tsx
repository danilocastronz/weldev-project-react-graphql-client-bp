import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AccountCircle as UserIcon,
  Brightness3 as DarkIcon,
  Brightness7 as LightIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import clsx from "clsx";

import { APP_TITLE, DRAWER_WIDTH } from "../utils/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
  })
);

interface HeaderProps {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

export const Header = ({
  open,
  handleMenuOpen,
  toggleTheme,
  useDefaultTheme,
}: HeaderProps) => {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      elevation={0}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <IconButton
            color="inherit"
            aria-label="open menu"
            onClick={handleMenuOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            size="small"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {APP_TITLE}
          </Typography>
        </div>
        <IconButton onClick={toggleTheme}>
          <Tooltip
            title={`Switch to ${useDefaultTheme ? "dark" : "light"} mode`}
            placement="bottom"
          >
            {useDefaultTheme ? <DarkIcon /> : <LightIcon />}
          </Tooltip>
        </IconButton>
        <IconButton size="small" color="inherit">
          <UserIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
