import { FC } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Currency from "../model/Currency.model";

// currency data
import data from "../data/currencies";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
  })
);

const CurrencySelection: FC<{
  currencyCode?: Currency | null;
  handleChange: (currency: Currency | null) => void;
}> = ({ currencyCode, handleChange }) => {
  const classes = useStyles();

  return (
    <Tooltip title="Select Currency" placement="bottom">
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="id-currency-select">Currency</InputLabel>
        <Select
          labelId="selection-currency-select-label"
          id="selection-currency"
          value={currencyCode ? currencyCode.code : undefined}
          onChange={(event) => {
            event.target.value !== undefined ? handleChange({ name: event.target.value as string, code: event.target.value as string }) : handleChange(null)
          }}
          autoWidth
          label="Currency"
        >
          <MenuItem value={undefined}>None</MenuItem>
          {data.map((currency: Currency, index: number) => (
            <MenuItem
              key={index}
              value={currency.code}
            >{`${currency.name}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip >
  );
};

export default CurrencySelection;
