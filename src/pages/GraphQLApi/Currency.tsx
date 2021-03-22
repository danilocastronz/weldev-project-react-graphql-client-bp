import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
} from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { useLazyQuery } from "@apollo/client";
import SwapIcon from '@material-ui/icons/SwapHorizRounded';

// components
import PageTitle from "../../components/PageTitle";
import CurrencyResult from "../../components/CurrencyResult";
import CurrencySelection from "../../components/CurrencySelection";
import CurrencyTextField from "../../components/CurrencyTextField";

// constants
import {
  APP_TITLE,
  PAGE_TITLE_GRAPHQL_API_CURRENCY,
} from "../../utils/constants";

// app graphql queries
import { GET_CURRENCIES } from "../../queries";

// model
import Currency from "../../model/Currency.model";

// define css-in-js
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

const CurrencyPage: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [currencySource, setCurrencySource] = useState<Currency | null>({
    name: "New Zealand Dollar",
    code: "NZD",
  });
  const [currencyDestination, setCurrencyDestination] = useState<Currency | null>({
    name: "US Dollar",
    code: "USD",
  });
  const [amount, setAmount] = useState(1);
  const [getCurrencies, { loading, data, error }] = useLazyQuery(
    GET_CURRENCIES
  );

  useEffect(
    () => getCurrencies({ variables: { currency: currencySource && currencySource.code } }),
    [currencySource, currencyDestination, amount]
  );

  const handleAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAmount(event.target.value as number);
  };

  const handleCurrencySource = (currency: Currency | null) => {
    setCurrencySource(currency);
  };

  const handleCurrencyDestination = (currency: Currency | null) => {
    setCurrencyDestination(currency);
  };

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
        <Typography variant="body1" gutterBottom>The conversion rates in this example are provided by the Coinbase API, through a GraphQL server instance. You can find it on the "Get started" section of the Apollo Client docs.</Typography>
        {/* currency conversion form */}
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
                  <Button onClick={handleCurrencySwap} variant='contained'>
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
        {/* handle api response */}
        {amount > 0 &&
          currencySource &&
          currencyDestination ? (
            <CurrencyResult
              data={data}
              loading={loading}
              error={error}
              amount={amount}
              currencySource={currencySource}
              currencyDestionation={currencyDestination}
            />
          ) : null}
      </div>
    </>
  );
};

export default CurrencyPage;
