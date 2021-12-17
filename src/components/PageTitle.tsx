import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      textTransform: "uppercase",
    },
  })
);

export const PageTitle = ({ title }: { title: string }) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h5"
      className={classes.title}
      color="textSecondary"
      gutterBottom
    >
      {title}
    </Typography>
  );
};
