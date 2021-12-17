import { ApolloError } from "@apollo/client";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import numeral from "numeral";

import { Conversion, Rate } from "../model/Conversion.model";
import Currency from "../model/Currency.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    result: {
      marginTop: theme.spacing(3),
    },
  })
);

interface CurrencyResultProps {
  data?: Conversion;
  loading?: boolean;
  error?: ApolloError;
  amount: number;
  currencySource: Currency;
  currencyDestination: Currency;
}

export const CurrencyResult = ({
  data,
  loading,
  error,
  amount,
  currencySource,
  currencyDestination,
}: CurrencyResultProps) => {
  const classes = useStyles();
  const currentCurrency = data?.rates?.find(
    (rate: Rate) => rate.currency === currencyDestination.code
  );

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
        {currentCurrency && (
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
                {`${numeral(amount * currentCurrency.rate).format("0.00")} ${
                  currentCurrency.currency
                } (${currentCurrency.currency})`}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
