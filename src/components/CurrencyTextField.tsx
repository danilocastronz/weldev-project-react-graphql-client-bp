import { FC } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
  InputAdornment,
} from "@material-ui/core";

const CurrencyTextField: FC<{
  amount: number;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}> = ({ amount, handleChange }) => {
  return (
    <Tooltip title="Inform Currency Amount" placement="bottom">
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          labelWidth={60}
          type="number"
          value={amount}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
    </Tooltip>
  );
};

export default CurrencyTextField;
