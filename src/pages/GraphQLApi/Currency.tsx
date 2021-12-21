import { useLazyQuery } from "@apollo/client";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SwapIcon from "@material-ui/icons/SwapHorizRounded";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { CurrencyResult } from "../../components/CurrencyResult";
import { CurrencySelection } from "../../components/CurrencySelection";
import { CurrencyTextField } from "../../components/CurrencyTextField";
import { PageTitle } from "../../components/PageTitle";
import { Conversion } from "../../model/Conversion.model";

import Currency from "../../model/Currency.model";
import { GET_CURRENCIES } from "../../queries";
import {
  APP_TITLE,
  PAGE_TITLE_GRAPHQL_API_CURRENCY,
} from "../../utils/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      maxWidth: "auto",
    },
    source: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      paddingLeft: theme.spacing(1),
    },
    label: {
      fontWeight: "bold",
    },
  })
);

export const CurrencyPage = () => {
  const classes = useStyles();
  const [currencySource, setCurrencySource] = useState<Currency>({
    name: "New Zealand Dollar",
    code: "NZD",
  });
  const [currencyDestination, setCurrencyDestination] = useState<Currency>({
    name: "US Dollar",
    code: "USD",
  });
  const [amount, setAmount] = useState(1);
  const [getCurrencies, { loading, data, error }] =
    useLazyQuery<Conversion>(GET_CURRENCIES);

  useEffect(
    () =>
      getCurrencies({
        variables: { currency: currencySource && currencySource.code },
      }),
    [currencySource, getCurrencies]
  );

  const handleAmount = (event: React.ChangeEvent<{ value: unknown }>) =>
    setAmount(event.target.value as number);

  const handleCurrencySource = (currency: Currency) =>
    setCurrencySource(currency);

  const handleCurrencyDestination = (currency: Currency) =>
    setCurrencyDestination(currency);

  const handleCurrencySwap = () => {
    setCurrencyDestination(currencySource);
    setCurrencySource(currencyDestination);
  };

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_GRAPHQL_API_CURRENCY} | {APP_TITLE}
        </title>
      </Helmet>
      <PageTitle title={PAGE_TITLE_GRAPHQL_API_CURRENCY} />
      <div>
        <Typography variant="body1" gutterBottom>
          The conversion rates in this example are provided by the Coinbase API,
          through a GraphQL server instance. You can find it on the "Get
          started" section of the Apollo Client docs.
        </Typography>
        <Paper elevation={3} className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
              >
                <Grid item>
                  <Typography variant="body2" className={classes.label}>
                    Convert From
                  </Typography>
                </Grid>
                <Grid item>
                  <CurrencyTextField
                    amount={amount}
                    handleChange={handleAmount}
                  />
                </Grid>
                <Grid item>
                  <CurrencySelection
                    currencyCode={currencySource}
                    handleChange={handleCurrencySource}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
              >
                <Grid item>
                  <Typography variant="body2" className={classes.label}>
                    To
                  </Typography>
                  <Button onClick={handleCurrencySwap} variant="contained">
                    <SwapIcon color="primary" />
                  </Button>
                </Grid>
                <Grid item>
                  <CurrencySelection
                    currencyCode={currencyDestination}
                    handleChange={handleCurrencyDestination}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {amount > 0 && currencySource && currencyDestination ? (
          <CurrencyResult
            data={data}
            loading={loading}
            error={error}
            amount={amount}
            currencySource={currencySource}
            currencyDestination={currencyDestination}
          />
        ) : null}
      </div>
    </>
  );
};
