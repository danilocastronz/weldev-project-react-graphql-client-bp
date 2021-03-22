import { FC } from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ApolloError } from "@apollo/client";
import numeral from "numeral";

// model
import Currency from "../model/Currency.model";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    result: {
      marginTop: theme.spacing(3),
    },
  })
);

const CurrencyResult: FC<{
  data?: any;
  loading?: boolean;
  error?: ApolloError | undefined;
  amount: number;
  currencySource: Currency;
  currencyDestionation: Currency;
}> = ({
  data,
  loading,
  error,
  amount,
  currencySource,
  currencyDestionation,
}) => {
    const classes = useStyles();

    const handleData = (rates: Array<any>): React.ReactElement | null => {
      const current = rates.filter(
        (e) => e.currency === currencyDestionation.code
      );
      return current ? (
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h5" color="textSecondary">
              {`${amount} ${currencySource.name} (${currencySource.code}) equals `}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color="textPrimary">
              {`${numeral(amount * current[0].rate).format("0.00")} ${current[0].name
                } (${current[0].currency})`}
            </Typography>
          </Grid>
        </Grid>
      ) : null;
    };

    return (
      <div className={classes.result}>
        <Grid container>
          {loading && (
            <Grid item>
              Loading, please wait...
              <CircularProgress />
            </Grid>
          )}
          {error && (
            <Grid
              item
            >{`Oh no, something went wrong. Error: ${error.message}`}</Grid>
          )}
          {data && data.rates && handleData(data.rates)}
        </Grid>
      </div>
    );
  };

export default CurrencyResult;
