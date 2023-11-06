import React, { useState } from "react";
const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOption = [],
  selectCurrent = "usd",
  amountDisable = false,
  currencyDisable = false,
}) => {

  return (
    <div id="input-box" className="text-black w-1/2 text-start m-auto border border-black p-3 pb-5 rounded shadow-lg">
      <label htmlFor="" className="text-white block ">
        {label}
      </label>
      <input
        type="number"
        placeholder="Enter Amount"
        className="p-2 rounded w-5/6 me-1"
        value={amount}
        min='0'
        onChange={(e) =>
          onAmountChange && onAmountChange(Number(e.target.value))
        }
      />
      <select
        name=""
        className="rounded p-2"
        id=""
        value={selectCurrent}
        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
      >
        {currencyOption.map((item) =><option key={item} value={item}>{item}</option>)}
      </select>
    </div>
  );
};

export default InputBox;
