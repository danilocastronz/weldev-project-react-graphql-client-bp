import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Currency from "../model/Currency.model";
import data from "../data/Currencies";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
  })
);

interface CurrencySelectionProps {
  currencyCode: Currency;
  handleChange: (currency: Currency) => void;
}

export const CurrencySelection = ({
  currencyCode,
  handleChange,
}: CurrencySelectionProps) => {
  const classes = useStyles();
  return (
    <Tooltip title="Select Currency" placement="bottom">
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel id="id-currency-select">Currency</InputLabel>
        <Select
          labelId="selection-currency-select-label"
          id="selection-currency"
          value={currencyCode.code}
          onChange={(event) => {
            handleChange({
              name: event.target.value as string,
              code: event.target.value as string,
            });
          }}
          autoWidth
          label="Currency"
        >
          {data.map((currency: Currency, index: number) => (
            <MenuItem key={`currency-${currency.code}`} value={currency.code}>
              {currency.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  );
};
